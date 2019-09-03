import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import uuid from "uuid";
import { default as requestEngine } from "./request/index";
import { default as loggerEngine } from "./apiLogger";
//import BaseHandler from "./handler/BaseHandler";
import UserHandler from "./handler/UserHandler";

const withHandler = (handler, loggerCreator) => (destination, options = {}) => {
  // 1. preprocess request
  const request = handler.handleRequest({ destination, options });
  if (!request.url || !request.options) {
    throw new Error(`invalid request object: ${JSON.stringify(request)}`);
  }

  // 2. create logger
  const logger = loggerCreator && loggerCreator(request);

  // 3. return Observable
  return Observable.of(null) // generate the source of the stream through Observable.of function
    .do(() => logger && logger.logRequest())
    .switchMap(() =>
      Observable.fromPromise(requestEngine(request.url, request.options))
    )
    .do(response => logger && logger.logResponse(response))
    .map(response => handler.handleResponse(response))
    .catch(error => {
      logger && logger.logError(error); // log raw error
      const processedError = handler.handleError(error);
      return Observable.throw(processedError);
    });
};

const withGet = func => (destination, options, ...rest) => {
  return func(destination, { ...options, method: "GET" }, ...rest);
};

const withPost = func => (destination, options, ...rest) => {
  return func(destination, { ...options, method: "POST" }, ...rest);
};

const loggerCreator = request => {
  return loggerEngine({
    id: uuid.v4().split("-")[0],
    ...request
  });
};

const pureRequest = withHandler(new UserHandler(), loggerCreator);

const pureGet = withGet(pureRequest);
const purePost = withPost(pureRequest);

export { withHandler, withGet, withPost };

export default {
  pureGet,
  purePost
};

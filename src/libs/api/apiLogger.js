import JSONbig from 'json-bigint';

const JSONbigString = JSONbig({ storeAsString: true });

const stringify = s => (typeof s === 'string' ? s : JSONbigString.stringify(s));

const isDebugRemotely = !!global.__REMOTEDEV__;

const logDefaultRequest = request => () => {
  const { id, url, options } = request;
  console.log(` \n
>>>>>>>>>>>>>>>>>>>> request >>>>>>>>>>>>>>>>>>>>
id: ${id}, method: ${options.method}, url: ${url}
request:
${stringify(request)}
<<<<<<<<<<<<<<<<<<<< request <<<<<<<<<<<<<<<<<<<<\n `);
};

const logDefaultResponse = request => response => {
  console.log(` \n
>>>>>>>>>>>>>>>>>>>> response >>>>>>>>>>>>>>>>>>>>
id: ${request.id}, method: ${request.options.method}, url: ${request.url}
response:
${stringify(response)}
<<<<<<<<<<<<<<<<<<<< response <<<<<<<<<<<<<<<<<<<<\n `);
};

const logDefaultError = request => error => {
  console.log(` \n
>>>>>>>>>>>>>>>>>>>> error >>>>>>>>>>>>>>>>>>>>
id: ${request.id}, method: ${request.options.method}, url: ${request.url}
error:
${stringify(error)}
<<<<<<<<<<<<<<<<<<<< error <<<<<<<<<<<<<<<<<<<<\n `);
};

const groupRemoteConsole = (log, css) => {
  try {
    console.groupCollapsed(`%c${log}`, css);
  } catch (e) {
    console.log(`%c${log}`, css);
  }
};

const groupRemoteConsoleEnd = () => {
  try {
    console.groupEnd();
  } catch (e) {}
};

const logRequestRemotely = request => () => {
  const { id, options, url } = request;
  groupRemoteConsole(`Request: ${id}`, 'color:#2196F3');
  console.log(`method: ${options.method}, url: ${url}`);
  console.log(request);
  groupRemoteConsoleEnd();
};

const logResponseRemotely = request => response => {
  groupRemoteConsole(`Response: ${request.id}`, 'color:#4CAF50');
  console.log(`method: ${request.options.method}, url: ${request.url}`);
  console.log(JSONbig.parse(response.body));
  groupRemoteConsoleEnd();
};

const logErrorRemotely = request => error => {
  groupRemoteConsole(`Error: ${request.id}`, 'color:#F44336');
  console.log(`method: ${request.options.method}, url: ${request.url}`);
  console.log(error);
  groupRemoteConsoleEnd();
};

const getLogger = request => ({
  logRequest: logDefaultRequest(request),
  logResponse: logDefaultResponse(request),
  logError: logDefaultError(request),
});

const getLoggerRemotely = request => ({
  logRequest: logRequestRemotely(request),
  logResponse: logResponseRemotely(request),
  logError: logErrorRemotely(request),
});

export default (isDebugRemotely ? getLoggerRemotely : getLogger);

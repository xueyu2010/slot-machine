import JSONbig from "json-bigint";
import querystring from "querystring";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import BaseHandler from "./BaseHandler";
import { getConfig } from "../../../utils/config";

const JSONbigString = JSONbig({ storeAsString: true });
const {
  buildVersion,
  deviceId,
  deviceName,
  baseUrl,
  clientId,
  clientSecret
} = getConfig();

const baseHeaders = {
  Authorization: `Basic ${Base64.stringify(
    Utf8.parse(`${clientId}:${clientSecret}`)
  )}`,
  "accept-language": "en_US",
  "app-version": buildVersion,
  "device-id": encodeURI(deviceId),
  "device-name": encodeURI(deviceName)
};

const getTranslationErrorMessage = errorMessage => {
  if (typeof errorMessage === "string") {
    if (errorMessage === "Non-base58 character") {
      return "errorMessage.nonBase58Character";
    } else if (errorMessage === "Unexpected '<'") {
      return "errorMessage.unexpected";
    } else if (errorMessage.indexOf("javax.net.ssl.SSL") >= 0) {
      return "errorMessage.sslException";
    } else if (errorMessage.indexOf("java.net.SocketTimeoutException") >= 0) {
      return "errorMessage.socketTimeoutException";
    }
  }
  return errorMessage;
};

class UserHandler extends BaseHandler {
  handleRequest(request) {
    const { destination, options } = request;
    // 1. enhance endpoint
    const url = this._enhanceEndpoint(destination);
    const { method, params, headers: apiHeaders } = options;
    // 2. enhance headers
    const headers = {
      //...this._getServerHeaders(request),
      ...apiHeaders
    };

    // 2. stringify body
    const bodyString = querystring.stringify(params);

    // 4. return new request object base on method
    if (method === "GET") {
      return {
        url: bodyString ? `${url}?${bodyString}` : url,
        options: {
          method,
          headers
        }
      };
    } else if (method === "POST") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      return {
        url,
        options: {
          method,
          headers,
          body: bodyString
        }
      };
    } else {
      throw new Error(`unsupported method: ${method}`);
    }
  }

  _enhanceEndpoint(endpoint) {
    return `${baseUrl}/${endpoint}`;
  }

  _getServerHeaders(request) {
    return { ...baseHeaders };
  }

  handleResponse(response) {
    const bodyString = super.handleResponse(response);
    if (!bodyString) {
      throw new Error(`invalid response body: ${bodyString}`);
    }
    const body = JSONbigString.parse(bodyString);
    if (body.success === false) {
      // must strict equals to false then throw
      throw body;
    } else {
      return body;
    }
  }

  handleError(error) {
    if (
      typeof error === "object" &&
      (error.hasOwnProperty("error_code") ||
        error.hasOwnProperty("error_message") ||
        error.hasOwnProperty("message"))
    ) {
      const { error_code, error_message, message, error_description } = error;
      return {
        errorCode: error_code,
        errorMessage: this._translateErrorMessage(error_message || message),
        errorDescription: error_description
      };
    }
    return error;
  }

  _translateErrorMessage(errorMessage) {
    return getTranslationErrorMessage(errorMessage);
  }
}

export default UserHandler;

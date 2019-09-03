class BaseHandler {
  /**
   *
   * @param request
   * @returns {{url: string, options: object}}
   */
  handleRequest(request) {
    const { destination, options } = request;
    const { params, ...rest } = options;
    return {
      url: destination,
      options: {
        ...rest,
        ...(params && { body: params })
      }
    };
  }

  /**
   *
   * @param response
   * @returns specify response string
   */
  handleResponse(response) {
    if (
      response &&
      typeof response.status === "number" &&
      typeof response.body === "string"
    ) {
      if (response.status >= 200 && response.status <= 299) {
        return response.body;
      } else {
        throw response;
      }
    } else {
      throw response;
    }
  }

  /**
   * @param error
   * @returns new error
   */
  handleError(error) {
    // bypass
    return error;
  }
}

export default BaseHandler;

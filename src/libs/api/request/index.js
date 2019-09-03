import Preconditions from '../../Preconditions/index';
import resolve from './resolve/index';

const TIMEOUT_IN_MILLISECOND = 60 * 1000;

const request = (url, options = {}) => {
  const { method, body } = options;
  Preconditions.checkOrThrow(
    method === 'GET' || method === 'POST',
    `METHOND ${method} is not supported`
  );
  if (method === 'POST') {
    Preconditions.checkOrThrow(!!body, `please specify body for POST request`);
  }
  return resolve(url, options, TIMEOUT_IN_MILLISECOND);
};

export default request;

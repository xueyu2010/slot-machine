import fetching from "./fetching";

const resolve = (url, options, timeout) => {
  return fetching.resolve(url, options, timeout);
};

export default resolve;

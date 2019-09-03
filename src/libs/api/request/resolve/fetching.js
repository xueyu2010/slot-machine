const getTimeoutPromise = (url, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`timeout, rejected by promise, url(${url})`));
    }, timeout);
  });
};

const headersToObject = headers => {
  const result = {};
  const iterator = headers.entries();
  let pair;
  while (!(pair = iterator.next()).done) {
    result[pair.value[0]] = pair.value[1];
  }
  return result;
};

const compatFetch = async (url, options) => {
  const response = await fetch(url, options);
  const body = await response.text();
  return {
    status: response.status,
    headers: headersToObject(response.headers),
    body,
  };
};

const resolve = (url, options, timeout) => {
  const promises = [compatFetch(url, options)];
  if (timeout > 0) {
    promises.push(getTimeoutPromise(url, timeout));
  }
  return Promise.race(promises);
};

export default { resolve };

const checkOrThrow = (expression, errorMessage) => {
  if (!expression) {
    throw new Error(errorMessage ? errorMessage : 'Error');
  }
};

const checkType = (value, type) => {
  if (!(typeof value === type)) {
    throw new Error(`${type} required, but got ${typeof value}`);
  }
};

export default {
  checkOrThrow,
  checkType,
};

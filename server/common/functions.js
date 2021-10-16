const createResponse = (success, message, errors, data) => {
  return {
    success,
    message,
    errors,
    data,
  };
};

const createUnkownErrorResponse = () => {
  return createResponse(
    false,
    "An unkown error has occured. Please try again.",
    [],
    {}
  );
};

module.exports = {
  createResponse,
  createUnkownErrorResponse,
};

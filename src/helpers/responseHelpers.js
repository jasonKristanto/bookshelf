module.exports = {
  sendSuccessResponse: (h,
      message = 'Success',
      statusCode = 200,
      data = null,
  ) => {
    let response;
    if (data === null) {
      response = h.response({
        status: 'success',
        message,
      });
    } else {
      response = h.response({
        status: 'success',
        message,
        data,
      });
    }

    response.code(statusCode);

    return response;
  },
  sendFailedResponse: (h,
      statusCode = 500,
      message = 'Failed',
  ) => {
    const response = h.response({
      status: 'fail',
      message,
    });

    response.code(statusCode);

    return response;
  },
};

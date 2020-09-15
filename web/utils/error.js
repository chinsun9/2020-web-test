class ApiError extends Error {
  constructor(code, name, message, url = '') {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.code = code;
    this.name = name;
    this.url = url;
  }
}

module.exports = ApiError;


module.exports = class ServerError extends Error {
    /**
     * The ForbiddenError Constructor.
     * @param {Object} options - A configuration object for errors.
     * @param {String} options.message - The error message if any.
     * @constructor ForbiddenError
     */
    constructor (options = {}) {
        super(options)
      Error.captureStackTrace(this, this.constructor)
     
      this.name = this.constructor.name
      this.message = options.message
    }
  }
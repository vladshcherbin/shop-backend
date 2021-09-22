class ValidationError extends Error {
  constructor(validationErrors, ...parameters) {
    super(...parameters)

    this.name = 'ValidationError'
    this.message = 'Validation error'
    this.extensions = {
      code: 'VALIDATION_ERROR',
      validationErrors
    }
  }
}

export default ValidationError

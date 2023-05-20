export const forbidden = {
  status: 403,
  description: 'Forbidden.',
  schema: {
    example: {
      statusCode: 403,
      message: 'Forbidden'
    },
    properties: {
      statusCode: { type: 'integer', description: 'User has not enough access' },
      message: { type: 'string', description: 'User error message' }
    }
  }
}

export const tooManyRequest = {
  status: 429,
  description: 'Too many request.',
  schema: {
    example: {
      statusCode: 429,
      message: 'Too many request'
    },
    properties: {
      statusCode: { type: 'integer', description: 'User has not enough access' },
      message: { type: 'string', description: 'User error message' }
    }
  }
}

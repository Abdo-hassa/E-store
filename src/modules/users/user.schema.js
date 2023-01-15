const schema = {
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'password'],
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
    },
    lastName: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 32,
    },
  },
};

module.exports = schema;

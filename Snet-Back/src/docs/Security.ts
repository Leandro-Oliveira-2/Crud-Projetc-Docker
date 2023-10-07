const SecuritySchemes = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'BearerAuthtentication',
  },
  BasicAuth: {
    type: 'http',
    scheme: 'basic',
  },
};

export default SecuritySchemes;

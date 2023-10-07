const Responses = {
  SuccessfullyCreated: {
    description: 'The resouce has successfully been created.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/components/schemas/attributes.Id',
            },
          },
        },
      },
    },
  },
  SuccessfulRequestNoResponseBody: {
    description: 'The request has successfully been processed.',
  },
  NotFoundError: {
    description: 'The resource(s)  with the given inputs was(were) not found.',
  },
  UnauthorizedError: {
    description: 'Authentication information is missing or invalid.',
  },
  ForbiddenError: {
    description: 'Authentication information is not missing and is valid, but user is not authorized to a given resource.',
  },
  UnprocessableEntity: {
    description: "The input is valid, but the request data couldn't be processed.",
  },
  BadRequest: {
    description: 'The input is invalid. Indicates that the input is in invalid format; or there are missing or invalid attributes. This should not happen if the input is properly validaded by the user.',
  },
};

export default Responses;

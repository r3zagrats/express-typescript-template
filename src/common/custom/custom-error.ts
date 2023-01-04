import createHttpError from 'http-errors';

export const BadRequestException = (msg: 'Invalid request', expose = true) => {
  const error = createHttpError[400](msg);
  error.expose = expose;
  return error;
};

export const InternalServerException = (msg = 'Internal Server Error', expose = true) => {
  const error = createHttpError[500](msg);
  error.expose = expose;
  return error;
};

export const ForbiddenException = (
  msg = 'You are not allowed to access this resource',
  expose = true
) => {
  const error = createHttpError[403](msg);
  error.expose = expose;
  return error;
};

export const NotFoundException = (msg = 'Resource not found', expose = true) => {
  const error = createHttpError[404](msg);
  error.expose = expose;
  return error;
};

export const UnauthorizedException = (msg: 'Cant authenticated the credentials', expose = true) => {
  const error = createHttpError[401](msg);
  error.expose = expose;
  return error;
};

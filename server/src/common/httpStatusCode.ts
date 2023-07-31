export const HTTP_STATUS_CODES = {
  OK: {
    status: 200,
    type: "ok",
  },
  CREATED: {
    status: 201,
    type: "Created",
  },
  BAD_REQUEST: {
    status: 400,
    type: "BadRequest",
  }, //falta de parametros
  CONFLICT: {
    status: 409,
    type: "Conflict",
  }, //dato actualmente en uso
  UNPROCESSABLE: {
    status: 422,
    type: "UnprocessableEntity",
  }, //error al momento de validar los datos
  GONE: {
    status: 410,
    type: 'Expired'
  },
  UNAUTHORIZED: {
    status: 401,
    type: "Unauthorized",
  }, //accesso no autorizado
  FORBIDDEN: {
    status: 403,
    type: "Forbidden",
  }, //autorizado pero no para lo que solicitas
  NOT_FOUND: {
    status: 404,
    type: "NotFound",
  }, //dato no encontrado
  SERVER_ERROR: {
    status: 500,
    type: "ServerError",
  },
};
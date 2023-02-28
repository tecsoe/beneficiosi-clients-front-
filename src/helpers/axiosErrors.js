export const getErrorMessage = (error) => {
  const statusCode = error?.response?.status;

  const errorMsg = statusCode === 401
    ? 'Debe iniciar sesión'
    : statusCode === 400
      ? error.response.data.message[0]
      : 'Ha occurido un error, nuestro equipo ha sido notificado. Intente más tarde.';

  return errorMsg;
}
export default function middleware(req, apiPath, handleResponse200, handleResponseError) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(req),
  };
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return handleResponse200();
      }
      throw new Error('Une erreur est survenue');
    }).catch((error) => {
      handleResponseError(error.message);
    });
}

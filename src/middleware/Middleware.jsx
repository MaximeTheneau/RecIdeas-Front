export default function middleware(req, apiPath, handleResponse200, handleResponseError) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(req),
  };
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          handleResponse200(data.message);
        });
      } else {
        response.json().then((data) => {
          handleResponseError(data.erreur);
        });
      }
    });
}

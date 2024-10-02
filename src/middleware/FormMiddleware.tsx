interface FormRequest {
  image?: File;
  [key: string]: any;
}

type HandleResponse200 = () => void;
// eslint-disable-next-line no-unused-vars
type HandleResponseError = (error: string) => void;

export default function formMiddleware(
  req: FormRequest,
  apiPath: string,
  handleResponse200: HandleResponse200,
  handleResponseError: HandleResponseError,
): void {
  const formData = new FormData();

  Object.keys(req).forEach((key) => {
    if (key === 'image' && req.image) {
      formData.append('image', req.image); // Ajoutez l'image au FormData
    } else {
      formData.append(key, req[key]);
    }
  });

  // eslint-disable-next-line no-undef
  const requestOptions: RequestInit = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        response.json().then(() => {
          handleResponse200();
        });
      } else {
        response.json().then((data) => {
          handleResponseError(data.erreur || 'error');
        });
      }
    });
}

import { useState, useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { MdFlatware } from 'react-icons/md';
import { LuCakeSlice, LuSalad } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import FormMiddleware from '../../middleware/FormMiddleware';

export default function FormRecype() {
  const t = useTranslations('recype');
  const [state, setState] = useState({
    form: {
      type: '',
    },
    timer: 0,
    message: '',
    error: '',
    loading: false,
  });
  useEffect(() => {
    let timerId;
    if (state.timer > 0) {
      timerId = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timerId); // Nettoyage du timer à chaque rendu
  }, [state.timer]);

  const handleResponse200 = (response) => {
    setState({
      ...state,
      form: {
        type: '',
        image: '',
      },
      message: response,
      timer: 30,
      error: '',
      loading: false,
    });
  };

  const handleResponseError = (error) => {
    setState({
      ...state,
      message: error,
    });
  };

  const handleSubmit = async (event = null) => {
    console.log(state);
    if (event) {
      event.preventDefault();
    }
    setState({ ...state, message: '' });

    if (state.timer > 0) {
      setState({ ...state, error: `Veuillez attendre ${state.timer} secondes avant de soumettre à nouveau.` });
      return;
    }
    const req = state.form;

    setState({
      ...state,
      loading: true,
      message: '',
      timer: 5,
    });
    FormMiddleware(req, 'pest-identification', handleResponse200, handleResponseError);
  };

  function handleInputChange(value) {
    setState({
      ...state,
      form: { type: value },
    });
    console.log(state);
    handleSubmit();
  }

  return (
    <div>

      <div className="flex flex-col sm:flex-row justify-around items-center">
        <Button
          onClick={() => handleInputChange('plats')}
          className="bg-secondary hover:bg-secondaryLight w-1/3 sm:w-1/4 m-1"
        >
          <MdFlatware className="w-4" />
          {t('btn-plat')}
        </Button>
        <Button
          onClick={() => handleInputChange('entrée')}
          className="bg-secondary hover:bg-secondaryLight w-1/3 sm:w-1/4 m-1"
        >
          <LuSalad className="w-4" />
          {t('btn-entree')}
        </Button>
        <Button
          onClick={() => handleInputChange('dessert')}
          className="bg-secondary hover:bg-secondaryLight w-1/3 sm:w-1/4 m-1"
        >
          <LuCakeSlice className="w-4" />
          {t('btn-dessert')}
        </Button>
      </div>

      {/* <button type="submit" className="button">Envoyer</button> */}
      {state.message && <p>{state.message}</p>}
      {state.loading && (
        <Spinner aria-label="Recype loading" size="lg" />
      )}
      {state.error && <p className="">{state.error}</p>}
    </div>
  );
}

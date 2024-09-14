import { useState, useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { MdFlatware } from 'react-icons/md';
import { LuCakeSlice, LuSalad } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import Middleware from '../../middleware/Middleware';

export default function FormRecype({ locale }) {
  const t = useTranslations('recype');
  const [state, setState] = useState({
    form: {
      type: '',
      locale,
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
        ...state.form,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // setState({ ...state, message: '' });

    // if (state.timer > 0) {
    //   setState({ ...state, error: `Veuillez attendre ${state.timer} secondes avant de soumettre à nouveau.` });
    //   return;
    // }
    // setState({
    //   ...state,
    //   loading: true,
    //   message: '',
    //   timer: 5,
    // });
    Middleware(state.form, 'recype', handleResponse200, handleResponseError);
  };
  function handleClick(value) {
    setState({
      ...state,
      message: '',
      form: {
        ...state.form,
        type: value,
      },
    });
    console.log(state);
  }
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around items-center">

        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            onClick={() => handleClick('plat')}
            id="plat"
            className="bg-secondary hover:bg-secondaryLight w-1/3 sm:w-1/4 m-1"
          >
            <MdFlatware className="w-4" />
            {t('btn-plat')}
          </Button>
        </form>

        <Button
          onClick={(e) => handleSubmit(e, 'entrée')}
          className="bg-secondary hover:bg-secondaryLight w-1/3 sm:w-1/4 m-1"
        >
          <LuSalad className="w-4" />
          {t('btn-entree')}
        </Button>
        <Button
          onClick={(e) => handleSubmit(e, 'dessert')}
          className="bg-secondary hover:bg-secondaryLight w-1/3 sm:w-1/4 m-1"
        >
          <LuCakeSlice className="w-4" />
          {t('btn-dessert')}
        </Button>
      </div>
      {/* <button type="submit" className="button">Envoyer</button> */}
      {state.message && <p dangerouslySetInnerHTML={{ __html: state.message }} />}
      {state.loading && (
        <Spinner aria-label="Recype loading" size="lg" />
      )}
      {state.error && <p className="">{state.error}</p>}
    </div>
  );
}

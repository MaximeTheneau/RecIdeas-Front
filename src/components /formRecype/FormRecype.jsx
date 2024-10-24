import { useState, useEffect } from 'react';
import { LuCakeSlice, LuSalad } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import Middleware from '../../middleware/Middleware';
import Spinner from '../ui/Spinner';

export default function FormRecype({ locale }) {
  const t = useTranslations('recype');
  const [state, setState] = useState({
    form: {
      type: 'dish',
      locale,
      supplement: '',
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
      timer: 10,
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

    if (state.timer > 0) {
      setState({ ...state, error: `${t('error')} ${state.timer}` });
      return;
    }
    setState({
      ...state,
      loading: true,
      timer: 5,
      message: '',
    });

    Middleware(state.form, 'recype', handleResponse200, handleResponseError);
  };
  function handleClick(value) {
    setState({
      ...state,
      form: {
        ...state.form,
        type: value,
      },
      error: '',
    });
  }
  return (
    <div className=" p-4 rounded  bg-secondaryLight sm:flex">
      <form onSubmit={handleSubmit} className="sm:w-1/2">
        <label htmlFor="supplement" className="text-xl block">
          {t('label')}
          {' '}
          :
        </label>
        <input
          placeholder={t('placeholder-french')}
          type="text"
          id="supplement"
          name="supplement"
          value={state.form.supplement}
          onChange={(e) => setState({
            ...state,
            form: {
              ...state.form,
              supplement: e.target.value,
            },
          })}
          maxLength={150}
          className="my-4 p-4 w-full"
        />

        <div>
          <div className="flex">
            <button
              type="submit"
              onClick={() => handleClick('dish')}
              id="dish"
              aria-label={t('btn-plat')}
              className=" border-solid border-1 border-blackOpacity bg-primary p-4 sm:p-6 font-bold  font-bold text-black hover:bg-secondary flex rounded-l-lg"
            >
              {t('btn-plat')}
            </button>
            <button
              type="submit"
              onClick={() => handleClick('entrance')}
              aria-label={t('btn-entree')}
              className="border-solid border-y-1 bg-primary p-4 sm:p-6 border-blackOpacity font-bold text-black hover:bg-secondary h-auto rounded-none"
              color="gray"
            >
              <LuSalad className="w-8" />
              {/* <Tooltip content={t('btn-entree')} className="">
              </Tooltip> */}
            </button>
            <button
              type="submit"
              onClick={() => handleClick('dessert')}
              aria-label={t('btn-dessert')}
              color="gray"
              className="border-solid border-1 bg-primary p-4 sm:p-6border-blackOpacity font-bold text-black hover:bg-secondary h-auto rounded-r-lg"
            >
              <LuCakeSlice className="w-8" />
              {/* <Tooltip content={t('btn-dessert')} className="">
              </Tooltip> */}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4 sm:w-1/2">
        {state.loading && (
        <Spinner aria-label="Recype loading" size="lg" className="flex justify-center" />
        )}

        {state.error && <p className="mt-4 text-xl">{state.error}</p>}
        {state.message
          && <p dangerouslySetInnerHTML={{ __html: state.message }} className="ml-8" /> }
      </div>
    </div>
  );
}

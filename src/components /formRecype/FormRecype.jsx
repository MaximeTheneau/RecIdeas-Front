import { useState, useEffect } from 'react';
import { LuCakeSlice, LuSalad } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import { FaRobot } from 'react-icons/fa';
import Middleware from '../../middleware/Middleware';
import Spinner from '../ui/Spinner';

export default function FormRecype({ locale }) {
  const t = useTranslations('recype');
  const [state, setState] = useState({
    form: {
      type: '',
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
    <div className="">
      <form onSubmit={handleSubmit} className="sm:w-2/3 mx-auto">
        <label htmlFor="supplement" className="text-xl block font-heading">
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
          className="my-4 p-4 w-full hover:scale-105 hover:shadow-lg"
        />

        <div>
          <div className=" hover:scale-105 hover:shadow-lg flex border-solid border-1 border-black rounded-lg  break-words">
            <button
              type="submit"
              onClick={() => handleClick('dish')}
              id="dish"
              aria-label={t('btn-plat')}
              className={`w-full border-solid py-4 md:w-8/12 border-1 border-blackOpacity  px-4 sm:p-6 hover:bg-secondary rounded-l-lg ${
                state.form.type === 'dish' ? 'bg-secondary' : 'bg-white'
              }`}

            >
              <FaRobot className="mr-2" size={20} />
              {t('btn-plat')}
            </button>
            <button
              type="submit"
              onClick={() => handleClick('entrance')}
              aria-label={t('btn-entree')}
              className={`md:w-2/12 px-2 border-solid border-y-1 border-blackOpacity  hover:bg-secondary h-auto rounded-none ${
                state.form.type === 'entrance' ? 'bg-secondary' : 'bg-white'
              }`}
            >
              <LuSalad className="inline-block" size={20} />
              {t('btn-entree')}
              {/* <Tooltip content={t('btn-entree')} className="">
              </Tooltip> */}
            </button>
            <button
              type="submit"
              onClick={() => handleClick('dessert')}
              aria-label={t('btn-dessert')}
              className={`md:w-2/12 px-2 border-solid border-1 border-blackOpacity  hover:bg-secondary h-auto rounded-r-lg ${
                state.form.type === 'dessert' ? 'bg-secondary' : 'bg-white'
              }`}
            >
              <LuCakeSlice size={20} />
              {t('btn-dessert')}
              {/* <Tooltip content={t('btn-dessert')} className="">
              </Tooltip> */}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4 sm:w-1/2 mx-auto">
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

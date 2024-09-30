import { useState, useEffect } from 'react';
import {
  Button, Card, Label, Spinner, TextInput,
  Tooltip,
} from 'flowbite-react';
import { MdFlatware } from 'react-icons/md';
import { LuCakeSlice, LuSalad } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import Middleware from '../../middleware/Middleware';

export default function FormRecype({ locale, recypeDefault }) {
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
    <Card>
      <form onSubmit={handleSubmit} className=" p-4 rounded">
        <Label htmlFor="supplement" className="text-xl">
          {t('label')}
          {' '}
          :
        </Label>
        <TextInput
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
          className="my-4  sm:w-2/3"
          color="gray"
        />

        <div>
          <Button.Group className="">
            <Button
              type="submit"
              onClick={() => handleClick('dish')}
              id="dish"
              aria-label={t('btn-plat')}
              className="font-bold text-black hover:bg-secondaryLight"
              color="gray"
            >
              <MdFlatware className="w-8" />
              {t('btn-plat')}
            </Button>
            <Button
              type="submit"
              onClick={() => handleClick('entrance')}
              aria-label={t('btn-entree')}
              className="font-bold text-[black] hover:bg-secondaryLight h-auto"
              color="gray"
            >
              <Tooltip content={t('btn-entree')} className="">
                <LuSalad className="w-8" />
              </Tooltip>
            </Button>
            <Button
              type="submit"
              onClick={() => handleClick('dessert')}
              aria-label={t('btn-dessert')}
              color="gray"
              className="font-bold text-[black] hover:text-secondary"
            >
              <Tooltip content={t('btn-dessert')} className="">
                <LuCakeSlice className="w-8" />
              </Tooltip>
            </Button>
          </Button.Group>
        </div>
      </form>
      <div className="">
        {state.loading && (
        <Spinner aria-label="Recype loading" size="lg" className="flex justify-center" />
        )}

        {state.error && <p className="mt-4 text-xl">{state.error}</p>}
        {state.message
          ? <p dangerouslySetInnerHTML={{ __html: state.message }} className="ml-8" />
          : !state.loading && <div dangerouslySetInnerHTML={{ __html: recypeDefault }} className="ml-8" /> }
      </div>
    </Card>
  );
}

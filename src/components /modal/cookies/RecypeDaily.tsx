import Button from '@/components /ui/Button';
import { useTranslations } from 'next-intl';
import {
  FormEvent, useEffect, useRef, useState,
} from 'react';

interface RecypeDailyProps {
    locale: string;
  }

export default function RecypeDaily({ locale }: RecypeDailyProps) {
  const t = useTranslations('recype-daily');
  const [state, setState] = useState({
    responses: {
      error: false,
      confirmEmail: false,
      confirm: false,
      message: '',
      messageComment: '',
      isLoading: false,
    },
    form: {
      user: '',
      email: '',
      locale,
    },
    openModal: false,
  });

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!localStorage.getItem('newDailyRecipe')) {
      setTimeout(() => {
        setState({ ...state, openModal: true });
      }, 8000);
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}newsletter/verify_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ajout des en-têtes pour spécifier le type de contenu
        },
        body: JSON.stringify({
          email: state.form.email,
          locale: state.form.locale,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setState({
          ...state,
          responses: {
            ...state.responses,
            confirmEmail: data.message,
            messageComment: '',
          },
        });

        // Ferme le modal si la confirmation est réussie
        setState((prevState) => ({
          ...prevState,
          openModal: false,
        }));

        // Enregistre dans le local storage
        window.localStorage.setItem('newDailyRecipe', 'true');
      } else {
        const errorData = await response.json();
        setState({
          ...state,
          responses: {
            ...state.responses,
            messageComment: errorData.message,
            confirmEmail: false,
          },
        });
      }
    } catch (error) {
      // Gère les erreurs de la requête
      console.error('Error during fetch:', error);
      setState({
        ...state,
        responses: {
          ...state.responses,
          messageComment: 'Une erreur s\'est produite lors de la soumission.',
          confirmEmail: false,
        },
      });
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setState({ ...state, openModal: true })}
      >
        {t('button')}
      </Button>

      {state.openModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white  rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <button
            type="button"
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 "
            onClick={() => setState({ ...state, openModal: false })}
          >
            X
          </button>
          <h2 className="text-xl font-semibold mb-4">{t('h2')}</h2>
          <p className="text-gray-900  text-lg mb-6">{t('p')}</p>

          <div>
            <label htmlFor="email" className="block text-gray-700  mb-2">
              E-mail
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@exemple.com"
                value={state.form.email}
                onChange={(e) => setState({
                  ...state,
                  form: {
                    ...state.form,
                    email: e.target.value,
                  },
                })}
                ref={emailInputRef}
                className="w-full p-2 border border-gray-300 rounded-lg  mb-4"
              />

              {state.responses.messageComment && (
              <p className="text-red-500">{state.responses.messageComment}</p>
              )}
            </label>
          </div>

          <div className="w-full mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              onClick={handleSubmit}
            >
              {t('button-submit')}
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

import {
  Button, Label, Modal, TextInput,
} from 'flowbite-react';
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
    if (state.responses.confirmEmail) {
      setState({
        ...state,
        openModal: false,
      });
      window.localStorage.setItem('newDailyRecipe', 'true');
    }
  };

  const handleBlur = (e: any) => {
    if (!e.target.value) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}newsletter/verify_email`, {
      method: 'POST',
      body: JSON.stringify({
        email: e.target.value,
        locale: state.form.locale,
      }),
      credentials: 'include',

    })
      .then(async (response) => {
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

          handleSubmit({ preventDefault: () => {} } as FormEvent);
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
      });
  };

  return (
    <>
      <Button onClick={() => setState({ ...state, openModal: true })}>
        {t('button')}
      </Button>
      <Modal show={state.openModal} size="md" popup onClose={() => setState({ ...state, openModal: false })} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h2>{t('h2')}</h2>
            <p className="text-xl font-medium text-gray-900 dark:text-white">
              {t('p')}
            </p>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="E-mail" />
              </div>
              <TextInput
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
                onBlur={(e) => handleBlur(e)}
                className="mb-4"
              />
              {state.responses.messageComment && (
              <p className="error">
                {state.responses.messageComment}
              </p>
              )}
            </div>
            <div className="w-full">
              <Button
                type="submit"
                onClick={handleSubmit}
              >
                {t('button-submit')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

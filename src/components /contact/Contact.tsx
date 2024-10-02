import React, { ChangeEvent, useState } from 'react';
import { Label, Textarea } from 'flowbite-react';
import formMiddleware from '../../middleware/FormMiddleware';
import Input from './form/Input';

interface FormState {
  name: string;
  email: string;
  message: string;
  subject: string;
}

interface ModalState {
  title: string;
  message: string;
  toggleModal: boolean;
}

interface ContactFormState {
  form: FormState;
  textArea: number;
  confirmationName: boolean | null;
  confirmationEmail: boolean | null;
  confirmationMessage: boolean | null;
  modal: ModalState;
}

// == Composant
export default function ContactForm() {
  const [state, setState] = useState<ContactFormState>({
    form: {
      name: '',
      email: '',
      message: '',
      subject: 'Demande de renseignements',
    },
    textArea: 1,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    modal: {
      title: '',
      message: '',
      toggleModal: false,
    },
  });

  const handleChangeMessage = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState((prevState) => ({
      ...prevState,
      textArea: trows,
      form: {
        ...prevState.form,
        message: e.target.value,
        confirmationMessage: true,
      },
    }));
  };

  const changeField = (value: string, field: string) => {
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  const handleResponse200 = () => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        subject: 'Demande de devis',
      },
      modal: {
        title: 'Merci !',
        message: 'On vous répondra au plus vite',
        toggleModal: true,
      },
    });
  };

  const handleResponseError = (error: string) => {
    setState({
      ...state,
      modal: {
        title: 'Oups !',
        message: error,
        toggleModal: true,
      },
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setState({
      ...state,
      modal: {
        title: 'Envoi en cours',
        message: 'Merci de patienter',
        toggleModal: true,
      },
    });
    const req = state.form;
    formMiddleware(req, 'contact', handleResponse200, handleResponseError);
  };

  return (
    <>
      {/* <Confirmation
        title={state.modal.title}
        message={state.modal.message}
        toggleModal={state.modal.toggleModal}
        onClick={() => setState({
          ...state,
          modal: {
            title: '',
            message: '',
            toggleModal: false,
          },
        })}
      /> */}
      <div className="w-full bg-secondaryLight sm:flex sm:justify-around pt-4 pb-4">

        <form className="w-full sm:w-1/2 sm:flex sm:flex-col sm:justify-center pr-4" onSubmit={handleSubmit}>
          <Label htmlFor="name" value="Name:" />
          <Input
            type="text"
            title="name"
            placeholder="Name"
            value={state.form.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'name')}
            required
          />
          <Label htmlFor="email" value="Email:" />
          <Input
            type="email"
            title="email"
            value={state.form.email}
            placeholder="exemple@email.fr"
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
            required
          />
          <div className="">
            <Label htmlFor="message" value="Message:" />
            <Textarea
              rows={4}
              title="message"
              value={state.form.message}
              onChange={handleChangeMessage}
              name="message"
              wrap="off"
              placeholder="Message"
              required
            />
          </div>
          <button
            className="text-base text-white sm:w-ful bg-secondary p-2 rounded   hover:scale-90  hover:text-white p-4 m-4"
            type="submit"
          >
            Envoyer
            <i className="icon-paper-plane pl-1" />
          </button>
        </form>
      </div>
    </>
  );
}

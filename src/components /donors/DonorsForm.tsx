import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import Button from '@/components /ui/Button';
import { useTranslations } from 'next-intl';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
interface FormState {
  name: string | '';
  amount: number;
  message: string | '';
  locale: string;
}

export default function DonorsForm({ locale }: { locale: string }) {
  const t = useTranslations('donate');

  const [state, setState] = useState<FormState>({
    name: '',
    message: '',
    locale,
    amount: 0,
  });
  const [errorStripe, setErrorStripe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customAmount, setCustomAmount] = useState<boolean>(false);

  const router = useRouter();

  const { status } = router.query;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.amount <= 0) {
      setErrorStripe(t('invalid-amount'));
      return;
    }

    setIsLoading(true);
    setErrorStripe(null);

    try {
      const stripe = await stripePromise;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error(t('error'));
      }

      const session = await response.json();

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error: any) {
      setErrorStripe(error.message || t('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const changeField = (value: string, field: string) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSelectAmount = (selectedAmount: number) => {
    setCustomAmount(false);
    setState({ ...state, amount: selectedAmount });
  };
  return (
    <form onSubmit={handleDonate} className="w-full sm:w-1/2 sm:flex sm:flex-col sm:justify-center mx-auto pr-4">
      <label htmlFor="name">
        {t('pseudo')}
        <input
          className="mb-4"
          id="name"
          title="name"
          value={state.name}
          onChange={(e) => changeField(e.target.value, 'name')}
          name="name"
          placeholder="Chefs Max"
          maxLength={70}
        />
      </label>
      <label htmlFor="message">
        {t('message')}
        <input
          className="mb-4"
          id="message"
          title="message"
          value={state.message}
          onChange={(e) => changeField(e.target.value, 'message')}
          name="message"
          placeholder="Message"
          maxLength={70}
        />
      </label>
      <div className="grid grid-cols-2 gap-4 my-4">
        {[5, 10, 20, 50].map((donation) => (
          <button
            type="button"
            key={donation}
            className={`p-4  border-2 rounded-lg  text-center cursor-pointer ${
              state.amount === donation ? 'bg-primary' : 'bg-secondary'
            }`}
            onClick={() => handleSelectAmount(donation)}
          >
            {donation}
            €
          </button>
        ))}

      </div>
      <button
        type="button"
        className={`p-4 border-2 rounded-lg w-full text-center cursor-pointer mb-4 ${
          customAmount ? 'bg-primary' : 'bg-secondary'
        }`}
        onClick={() => { setCustomAmount(true); setState({ ...state, amount: 0 }); }}
      >
        {t('other-amount')}
      </button>
      {customAmount && (
      <input
        type="number"
        className="p-2 border-2 rounded-lg w-32 text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Montant"
        value={state.amount}
        onChange={(e) => changeField(e.target.value, 'amount')}
        minLength={1}
      />
      )}
      <Button
        className="text-base bg-secondary block w-full sm:w-ful p-4 rounded  p-8 "
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? '...' : t('support')}
      </Button>
      {status === 'success' && (
      <h2>
        {t('thank-you')}
      </h2>
      )}
      {errorStripe && status === 'error' && (
      <p>
        {t('error')}
      </p>
      )}
    </form>
  );
}

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded bg-primary py-2 px-4 font-bold text-white data-[hover]:bg-sky-500 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

import { TextInput } from 'flowbite-react';

interface InputProps {
  type: string;
  title: string;
  value: string;
  placeholder: string;
  onChange: any;
  required: boolean;
}
export default function Input({
  type,
  title,
  value,
  placeholder,
  onChange,
  required,
}: InputProps) {
  return (
    <TextInput
      type={type}
      title={title}
      id={title}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className="pb-4"
    />
  );
}

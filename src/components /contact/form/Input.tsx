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
    <input
      type={type}
      title={title}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
}

import { Input } from './ui/input';

export interface InputFieldProps {
  value: string;
  label?: string;
  placeholder?: string;
}

export default function InputField({
  value,
  label = 'label',
  placeholder = 'placeholder',
}: InputFieldProps) {
  return (
    <>
      <label htmlFor="">{label}</label>
      <Input value={value} placeholder={placeholder} />
    </>
  );
}

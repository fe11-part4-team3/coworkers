export interface InputFieldBaseProps {
  value: string;
  placeholder: string;
  disabled?: boolean;
  label?: string;
  essential?: boolean;
  name: string;
}

export interface InputFieldProps extends InputFieldBaseProps {
  type?: 'text' | 'password' | 'email';
  label?: string;
  errorMessage?: string;
  width?: string;
  onClickButton?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaFieldProps extends InputFieldBaseProps {
  size?: 'md' | 'lg';
  height?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

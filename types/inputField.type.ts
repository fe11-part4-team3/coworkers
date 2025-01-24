export interface InputFieldBaseProps {
  label?: string;
  essential?: boolean;
}

export interface InputFieldProps
  extends InputFieldBaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email';
  label?: string;
  errorMessage?: string | null;
  width?: string;
  onClickButton?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaFieldProps
  extends InputFieldBaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'md' | 'lg';
  height?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

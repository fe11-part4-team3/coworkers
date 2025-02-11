export interface InputFieldBaseProps {
  label?: string;
  essential?: boolean;
}

export interface InputFieldProps
  extends InputFieldBaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email';
  errorMessage?: string;
  width?: string;
  onClickButton?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sesstionStatus?: string;
}

export interface TextareaFieldProps
  extends InputFieldBaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'md' | 'lg';
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

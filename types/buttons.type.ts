// 기본 버튼 속성 정의
type ButtonsBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  icon?: React.ReactNode | false;
  className?: string;
  rounded?: boolean;
  loading?: boolean;
  size?: 'S' | 'M' | 'L' | 'XL';
  border?: false | 'default' | 'primary' | 'secondary';
  textColor?: 'default' | 'white' | 'primary';
  backgroundColor?: 'white' | 'gradient' | 'none' | 'default' | 'danger';
};

// href 속성이 있는 경우 (링크 버튼)
type ButtonsLinkProps = ButtonsBaseProps & {
  href?: string;
  onClick?: never;
  onSubmit?: never;
};

// onClick 속성이 있는 경우 (클릭 버튼)
type ButtonsClickProps = ButtonsBaseProps & {
  onClick?: () => void;
  onSubmit?: () => void;
  href?: never;
};

// ButtonsProps는 링크 버튼과 클릭 버튼 중 하나
export type ButtonsProps = ButtonsLinkProps | ButtonsClickProps;

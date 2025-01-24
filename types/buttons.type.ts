// 기본 버튼 속성 정의
type ButtonsBaseProps = {
  text: string;
  variant?: 'outline' | 'secondary' | 'destructive' | '';
  icon?: React.ReactNode | false;
  bg?: 'white' | 'gradient' | 'none' | 'default';
  rounded?: boolean;
  size?: 'S' | 'M' | 'L' | 'XL';
  width?: string;
  type?: 'button' | 'submit';
};

// Loading이 true인 경우
type LoadingTrueProps = {
  loading: true;
  disabled: true;
};

// Loading이 false이거나 없는 경우
type LoadingFalseProps = {
  loading?: false;
  disabled?: boolean;
};

// href 속성이 있는 경우 (링크 버튼)
type ButtonsLinkProps = ButtonsBaseProps &
  (LoadingTrueProps | LoadingFalseProps) & {
    href: string;
    onClick?: never;
  };

// onClick 속성이 있는 경우 (클릭 버튼)
type ButtonsClickProps = ButtonsBaseProps &
  (LoadingTrueProps | LoadingFalseProps) & {
    onClick?: () => void;
    href?: never;
  };

// ButtonsProps는 링크 버튼과 클릭 버튼 중 하나
export type ButtonsProps = ButtonsLinkProps | ButtonsClickProps;

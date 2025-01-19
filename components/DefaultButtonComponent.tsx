import React from 'react';

interface ButtonProps {
  padding?: '14' | '13' | '12' | '6';
  hasIcon?: boolean;
  cornerRadius?: '32' | '16' | '14' | '12';
  backgroundColor?: 'default' | 'white' | 'red' | 'gradient';
  fontSize?: '16sb' | '14sb';
  styleType?: 'solid' | 'outlined' | 'outlined-secondary';
  state?: 'hover' | 'click' | 'danger' | 'disabled';
  onClick?: () => void;
  children: React.ReactNode;
}

const DefaultButton: React.FC<ButtonProps> = ({
  padding = '14',
  hasIcon = false,
  cornerRadius = '32',
  backgroundColor = 'brand-primary',
  fontSize = '16sb',
  styleType = 'solid',
  state = 'default',
  onClick,
  children,
}) => {
  const paddingClass = `h-px-${padding}`;
  const cornerRadiusClass = `rounded-${cornerRadius}`;

  const backgroundColorMap: { [key: string]: string } = {
    hover: 'bg-interaction-hover',
    click: 'bg-interaction-Pressed',
    danger: 'bg-Status-Danger',
    disabled: 'bg-interaction-inactive cursor-not-allowed',
    default: 'bg-brand-primary',
  };

  const backgroundColorClass =
    backgroundColorMap[state] || backgroundColorMap.default;
  const fontSizeClass = fontSize === '16sb' ? 'text-16sb' : 'text-14sb';
  const styleTypeClass =
    state === 'hover' || state === 'click'
      ? `border border-${backgroundColor}`
      : styleType === 'solid'
        ? 'border-none'
        : styleType === 'outlined'
          ? `border border-Text-Secondary`
          : `border border-${backgroundColor}`;

  const stateClass =
    state === 'default' ? 'bg-brand-primary' : `bg-${backgroundColor}`;
  const textColorClass = backgroundColor === 'white' ? 'bg-b-inverse' : '';
  const borderColorClass =
    backgroundColor === 'white' ? 'border-b-inverse' : '';

  const className = `button ${paddingClass} ${cornerRadiusClass} ${backgroundColorClass} ${fontSizeClass} ${styleTypeClass} ${stateClass} ${textColorClass} ${borderColorClass}`;
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={state === 'disabled'}
    >
      {hasIcon && <span className="icon"></span>}
      {children}
    </button>
  );
};

export default DefaultButton;

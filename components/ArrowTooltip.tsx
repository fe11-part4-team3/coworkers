import classNames from 'classnames';
import { CircleAlert, Info, TriangleAlert } from 'lucide-react';

interface ArrowTooltipProps {
  state?: 'ERROR' | 'WARNING' | 'DEFAULT' | false;
  children: string;
  className?: string;
}

const STATE = {
  ERROR: {
    color: 'before:border-b-s-danger border-s-danger text-s-danger',
    icon: <CircleAlert size={16} stroke="#dc2626" />,
  },
  WARNING: {
    color: 'before:border-b-p-orange border-p-orange text-p-orange',
    icon: <TriangleAlert size={16} stroke="#f97316" />,
  },
  DEFAULT: {
    color: 'before:border-b-t-default border-t-default text-t-default',
    icon: <Info size={16} stroke="#64748b" />,
  },
};

function ArrowTooltip({
  state = 'DEFAULT',
  children,
  className,
}: ArrowTooltipProps) {
  return (
    <div className={`absolute ${className}`}>
      <div
        className={classNames(
          'input-tooltip',
          'flex items-center justify-center gap-pr-5',
          state ? STATE[state].color : STATE.DEFAULT.color,
        )}
      >
        {state ? STATE[state].icon : STATE.DEFAULT.icon}
        {children}
      </div>
    </div>
  );
}

export default ArrowTooltip;

import ArrowTooltip from '@/components/ArrowTooltip';

/**
 * Error message component
 * @param {string} message - Error message
 */
export default function ErrorMessage({
  children,
  tooltipState,
  className,
}: {
  children: string;
  tooltipState?: 'ERROR' | 'WARNING';
  className?: string;
}) {
  return (
    <ArrowTooltip
      className={`-bottom-pr-42 left-0 ${className}`}
      state={tooltipState}
    >
      {children}
    </ArrowTooltip>
  );
}

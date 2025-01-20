import { elapsedTime } from '@/utils/dateConversion';

function DateDisplay({ createdAt }: { createdAt: string }) {
  return (
    <span className="text-14 text-t-secondary">{elapsedTime(createdAt)}</span>
  );
}

export default DateDisplay;

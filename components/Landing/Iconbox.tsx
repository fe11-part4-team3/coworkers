import Image from 'next/image';
import classNames from 'classnames';

interface IconBoxProps {
  imageUrl: string;
  alt?: string;
  left?: boolean;
  right?: boolean;
}

const IconBox: React.FC<IconBoxProps> = ({
  imageUrl,
  alt = 'Icon',
  left,
  right,
}) => {
  return (
    <div
      className={classNames(
        'flex h-pr-48 w-pr-48 flex-col items-center justify-center rounded-pr-12 border border-border bg-b-secondary drop-shadow-[0_0_2px_rgba(0,0,0,0.25)] mo:self-start',
        {
          'self-start': right,
          'self-end': left,
        },
      )}
    >
      <Image
        src={`/images/landing/${imageUrl}`}
        alt={alt}
        width={24}
        height={24}
        className="size-pr-24 object-contain"
      />
    </div>
  );
};

export default IconBox;

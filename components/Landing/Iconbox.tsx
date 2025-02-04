import Image from 'next/image';

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
      className={`backdrop-blur-pr-12 flex h-pr-48 w-pr-48 items-center justify-center rounded-pr-12 border border-border bg-b-secondary drop-shadow-[0_0_2px_rgba(0,0,0,0.25)] ${left ? 'absolute left-0' : ''} ${right ? 'absolute right-0' : ''}`}
    >
      <Image
        src={`/images/landing/${imageUrl}`}
        alt={alt}
        width={24}
        height={24}
        className="h-pr-24 w-pr-24 object-contain"
      />
    </div>
  );
};

export default IconBox;

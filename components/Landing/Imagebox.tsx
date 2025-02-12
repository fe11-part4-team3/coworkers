import React from 'react';
import Image from 'next/image';

interface ImageBoxProps {
  imageUrl: string;
  position?: 'left' | 'right';
  align?: 'start' | 'end';
}

const ImageBox: React.FC<ImageBoxProps> = ({
  imageUrl,
  position = 'left',
  align = 'start',
}) => {
  const flexDirection = position === 'left' ? 'justify-start' : 'justify-end';
  const alignClass = align === 'start' ? 'self-start' : 'self-end';
  const margin = position === 'left' ? 'ml-pr-33' : 'mr-pr-33';

  return (
    <div className="flex h-pr-419 w-pr-498">
      <div className={`flex ${flexDirection} w-full items-center`}>
        <Image
          src={imageUrl}
          alt="image"
          width={291}
          height={338}
          className={`${alignClass} ${margin} border-none`}
        />
      </div>
    </div>
  );
};

export default ImageBox;

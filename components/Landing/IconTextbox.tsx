import React from 'react';
import Image from 'next/image';

interface IconTextBoxProps {
  imageUrl: string;
  text: string;
  position?: 'left' | 'right';
}

const IconTextBox: React.FC<IconTextBoxProps> = ({
  imageUrl,
  text,
  position = 'left',
}) => {
  const paddingClass =
    position === 'left' ? 'pl-pr-160 pt-pr-151' : 'pr-pr-165 pt-pr-151';

  const flexDirection =
    position === 'left'
      ? 'items-start text-left'
      : 'items-end text-right self-end ml-auto';

  return (
    <div className={`flex h-pr-419 w-pr-498 flex-col ${paddingClass}`}>
      <div
        className={`relative flex h-pr-120 w-auto w-pr-157 min-w-pr-180 flex-col ${flexDirection} gap-pr-2`}
      >
        <div className="h-pr-40 w-pr-40">
          <Image src={imageUrl} alt="icon" width={48} height={48} />
        </div>
        <p className="text-24r text-t-primary">
          {text.split('\\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== text.split('\\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default IconTextBox;

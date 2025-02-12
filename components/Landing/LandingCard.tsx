import classNames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';

interface LandingCardProps {
  children: ReactNode;
  className?: string;
}

function LandingCard({ children, className }: LandingCardProps) {
  return (
    <div
      className={classNames('flex h-pr-419 w-pr-996 rounded-pr-40', className)}
    >
      {children}
    </div>
  );
}

function LandingInnerCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-full rounded-pr-40 bg-[#0F172A]">{children}</div>
  );
}

interface LandingCardImageProps {
  src: string;
  xPosition?: 'start' | 'end';
  yPosition?: 'start' | 'end';
}

function LandingCardImage({
  src,
  xPosition,
  yPosition,
}: LandingCardImageProps) {
  return (
    <div
      className={classNames(
        'flex h-full w-1/2',
        xPosition === 'start' ? 'justify-start' : 'justify-end',
        yPosition === 'start' ? 'items-start' : 'items-end',
      )}
    >
      <Image
        src={src}
        alt=""
        width={291}
        height={338}
        className={xPosition === 'end' ? 'mr-pr-51' : 'ml-pr-51'}
      />
    </div>
  );
}

function LandingCardTextWrapper({
  children,
  icon,
  right,
}: {
  children: ReactNode;
  icon: string;
  right?: boolean;
}) {
  return (
    <div
      className={classNames(
        'flex h-full w-1/2 items-center',
        right ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={classNames(
          'flex flex-col',
          right ? 'items-end pr-pr-160' : 'items-start pl-pr-160',
        )}
      >
        <div
          style={{ boxShadow: '0 0 12px 2px rgba(0, 0, 0, 0.25)' }}
          className="mb-pr-12 flex size-pr-48 items-center justify-center rounded-xl border border-[#343E4E] bg-[#1E293B]"
        >
          <Image src={icon} alt="" width={24} height={24} />
        </div>
        <div
          className={classNames(
            'flex flex-col',
            right ? 'items-end' : 'items-start',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function LandingCardText({ children }: { children: string }) {
  return <p className="text-24m text-white">{children}</p>;
}

LandingCard.Image = LandingCardImage;
LandingCard.TextWrapper = LandingCardTextWrapper;
LandingCard.Text = LandingCardText;
LandingCard.Inner = LandingInnerCard;

export default LandingCard;

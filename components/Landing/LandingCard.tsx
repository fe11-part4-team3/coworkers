import classNames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LandingCardProps {
  children: ReactNode;
  className?: string;
}

function LandingCard({ children, className }: LandingCardProps) {
  return (
    <div
      className={classNames(
        'flex h-pr-419 w-full overflow-hidden rounded-pr-40 mo:h-pr-467 mo:flex-col mo:gap-pr-40 ta:h-pr-354',
        className,
      )}
    >
      {children}
    </div>
  );
}

function LandingInnerCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-full overflow-hidden rounded-pr-40 bg-[#0F172A] mo:flex-col-reverse mo:gap-pr-40">
      {children}
    </div>
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
    <motion.div
      className={classNames(
        'flex h-full w-1/2 mo:w-full',
        xPosition === 'start'
          ? 'justify-start mo:justify-center'
          : 'justify-end mo:justify-center',
        yPosition === 'start'
          ? 'items-start mo:items-center'
          : 'items-end mo:items-center',
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.5,
      }}
    >
      <Image
        src={src}
        alt=""
        width={294}
        height={329}
        className={classNames(
          'tamo:h-pr-268 tamo:w-pr-231',
          xPosition === 'end'
            ? 'mr-pr-51 tamo:mr-pr-0'
            : 'ml-pr-51 tamo:ml-pr-0',
        )}
      />
    </motion.div>
  );
}

function LandingCardTextWrapper({
  children,
  icon,
  right,
  className,
}: {
  children: ReactNode;
  icon: string;
  right?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={classNames(
        'flex h-full w-1/2 items-center mo:w-full',
        right
          ? 'justify-end mo:items-start mo:justify-center'
          : 'justify-start mo:items-start mo:justify-center',
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.8,
      }}
    >
      <div
        className={classNames(
          'flex flex-col mo:min-w-pr-231',
          right
            ? 'items-end pr-pr-160 mo:items-start mo:pr-pr-0 ta:pr-pr-100'
            : 'items-start pl-pr-160 mo:pl-pr-0 ta:pl-pr-100',
        )}
      >
        <div
          style={{ boxShadow: '0 0 12px 2px rgba(0, 0, 0, 0.25)' }}
          className="mb-pr-12 flex size-pr-48 items-center justify-center rounded-xl border-[#343E4E] bg-[#1E293B]"
        >
          <Image src={icon} alt="" width={24} height={24} />
        </div>
        <div
          className={classNames(
            'flex flex-col',
            right ? 'items-end mo:items-start' : 'items-start',
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function LandingCardText({ children }: { children: string }) {
  return <p className="text-24m text-white tamo:text-18m">{children}</p>;
}

LandingCard.Image = LandingCardImage;
LandingCard.TextWrapper = LandingCardTextWrapper;
LandingCard.Text = LandingCardText;
LandingCard.Inner = LandingInnerCard;

export default LandingCard;

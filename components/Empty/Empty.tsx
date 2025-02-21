import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Buttons from '@/components/Buttons';

import { EmptyButtonsProps } from './Empty.type';

const BUTTON_SIZE = 'w-pr-278';

/**
 * 객체가 없을때 사용하는 컴포넌트
 * @example
 * <Empty>
 *  <Empty.TextWrapper>
 *   <Empty.Text text="조회된 게시글이 없습니다." />
 *  </Empty.TextWrapper>
 *  <Empty.ButtonWrapper>
 *   <Empty.Buttons text="버튼 1" href="/" />
 *   <Empty.ButtonsBorder text="버튼 2" href="/" />
 *  </Empty.ButtonWrapper>
 * </Empty>
 */
function Empty({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center gap-y-pr-16 tamo:gap-y-pr-8',
        className,
      )}
    >
      <div className="relative h-pr-255 w-pr-810 mo:h-pr-98 mo:w-pr-312 ta:h-pr-164 ta:w-pr-520">
        <Image
          src="/images/img-noTeam.png"
          alt="No data"
          className="select-none object-contain"
          sizes="(max-width: 320px) 100vw, (max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          fill
          priority
        />
      </div>

      {children}
    </div>
  );
}

/**
 * 텍스트 wrapper
 * @example
 * <Empty.TextWrapper>
 *  <Empty.Text text="조회된 게시글이 없습니다." />
 * </Empty.TextWrapper>
 */
Empty.TextWrapper = function EmptyTextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-pr-48 flex flex-col items-center justify-center gap-pr-4 text-center text-16m text-t-default mo:mt-pr-32">
      {children}
    </div>
  );
};

/**
 * 텍스트
 * @example
 * <Empty.Text text="조회된 게시글이 없습니다." />
 */
Empty.Text = function EmptyText({ text }: { text: string }) {
  return <p>{text}</p>;
};

/**
 * 버튼 wrapper
 * @example
 * <Empty.ButtonWrapper>
 *  <Empty.Buttons text="버튼 1" href='/' />
 * </Empty.ButtonWrapper>
 */
Empty.ButtonWrapper = function EmptyButtonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-pr-80 flex flex-col items-center justify-center gap-y-pr-16 mo:mt-pr-48">
      {children}
    </div>
  );
};

/**
 * 기본 버튼 스타일
 */
Empty.Buttons = function EmptyButtons({
  text,
  href,
  onClick,
}: EmptyButtonsProps) {
  return href ? (
    <Buttons text={text} className={BUTTON_SIZE} href={href} />
  ) : (
    <Buttons text={text} className={BUTTON_SIZE} onClick={onClick} />
  );
};

/**
 * 테두리 버튼 스타일
 */
Empty.ButtonsBorder = function EmptyButtons({
  text,
  href,
  onClick,
}: EmptyButtonsProps) {
  const stylesProps = {
    text,
    className: BUTTON_SIZE,
    backgroundColor: 'none' as const,
    border: 'primary' as const,
    textColor: 'primary' as const,
  };

  return href ? (
    <Buttons {...stylesProps} href={href} />
  ) : (
    <Buttons {...stylesProps} onClick={onClick} />
  );
};

export default Empty;

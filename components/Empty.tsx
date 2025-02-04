import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Buttons from '@/components/Buttons';

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
          className="object-contain"
          fill
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

interface IEmptyButtonsProps {
  text: string;
  href: string;
}

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
Empty.Buttons = function EmptyButtons({ text, href }: IEmptyButtonsProps) {
  return <Buttons text={text} className="w-pr-278" href={href} />;
};

/**
 * 테두리 버튼 스타일
 */
Empty.ButtonsBorder = function EmptyButtons({
  href,
  text,
}: IEmptyButtonsProps) {
  return (
    <Buttons
      text={text}
      className="w-pr-278"
      backgroundColor="none"
      border="primary"
      textColor="primary"
      href={href}
    />
  );
};

export default Empty;

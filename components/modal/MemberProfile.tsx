'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import CloseIcon from '@/public/images/icon-close.svg';
import ModalBase from '@/components/modal/ModalBase';
import Image from 'next/image';

/**
 * 멤버 프로필 모달 컴포넌트.
 * 이메일 복사하기 버튼 클릭 시 이메일을 복사하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (이메일 복사 기능을 처리하는 함수 전달해주세요.)
 * @param {string} image - 멤버 이미지 (디폴트 이미지는 해당 컴포넌트에서 처리, 멤버 이미지가 있을 때 props로 경로 전달해주세요.)
 * @param {string} name - 멤버 이름
 * @param {string} email - 멤버 이메일
 */

export default function MemberProfile({
  onClick,
  image,
  name,
  email,
}: {
  onClick: () => void;
  image?: string;
  name: string;
  email: string;
}) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  return (
    <>
      <ModalBase className="px-pr-52 pt-pr-48">
        <div className="w-full">
          <CloseIcon
            width={20}
            height={20}
            className="absolute right-pr-16 top-pr-16 cursor-pointer"
            onClick={closeModal}
          />
          <div className="mb-pr-24 text-center">
            <div className="relative mx-auto mb-pr-24 h-pr-52 w-pr-52 overflow-hidden rounded-full">
              <Image
                fill
                src={image || '/images/icon-profile-member-default.svg'}
                alt="멤버 이미지"
                objectFit="cover"
                sizes="52px"
              />
            </div>
            <h2 className="mb-pr-8 text-18 text-t-primary">{name}</h2>
            <p className="text-14 text-t-secondary">{email}</p>
          </div>
        </div>
        <Button
          text="이메일 복사하기"
          onClick={handleOnClick}
          color="primary"
          className="w-full"
        />
      </ModalBase>
    </>
  );
}

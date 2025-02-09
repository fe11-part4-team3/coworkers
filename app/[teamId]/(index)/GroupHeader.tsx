'use client';

import Image from 'next/image';

import IconGear from '@/public/images/icon-gear.svg';
import DropDown from '@/components/DropDown';
import useThemeMode from '@/hooks/useThemeMode';
import { RoleType } from '@/types/group.type';
import useModalStore from '@/stores/modalStore';

import GroupEditModal from './GroupEditModal';

interface GroupHeaderProps {
  role: RoleType;
  name: string;
}

//TODO 썸네일 이미지 추가
export default function GroupHeader({ role, name }: GroupHeaderProps) {
  const theme = useThemeMode();
  const { openModal } = useModalStore();

  const handleClickEdit = () => {
    openModal(<GroupEditModal />);
  };

  return (
    <header className="flex max-h-pr-64 max-w-pr-1200 items-center justify-between rounded-pr-12 border border-[#F8FAFC1A] bg-[--t-primary-dark-10] px-pr-20">
      <h2 className="text-20b text-primary">{name}</h2>
      <div className="flex items-center gap-pr-20">
        <Image
          src={
            theme === 'dark'
              ? '/images/img-thumbnail-team.png'
              : '/images/img-thumbnail-team-light.png'
          }
          alt=""
          width={181}
          height={64}
        />
        {role === 'ADMIN' && (
          <DropDown
            trigger={
              <IconGear className="transition-all hover:rotate-90 hover:scale-110 focus:rotate-90 data-[state=open]:rotate-90 data-[state=open]:scale-110" />
            }
            items={[
              { text: '수정하기', onClick: handleClickEdit },
              { text: '삭제하기', onClick: () => {} },
            ]}
          />
        )}
      </div>
    </header>
  );
}

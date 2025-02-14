import React, { useMemo } from 'react';
import { signOut } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';

import Logout from '@/components/modal/Logout';
import { removeLoginProcessed } from '@/lib/kakaoStorage';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useModalStore from '@/stores/modalStore';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';
import DropDown from '@/components/DropDown';
import { Button } from '@/components/ui/button';

import Profile from './Profile';

function HeadersProfileDropDown() {
  const { user, clear: clearUser } = useUser();
  const { clear: clearGroup } = useGroup();

  const { showSnackbar } = useSnackbar();
  const { openModal } = useModalStore();

  const queryClient = useQueryClient();

  const logout = () => {
    clearUser();
    clearGroup();

    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['group'] });
    queryClient.removeQueries({ queryKey: ['tasks'] });
    queryClient.removeQueries({ queryKey: ['taskList'] });

    // STUB 세션 로그아웃
    signOut({ redirect: false });
    removeLoginProcessed();

    showSnackbar('로그아웃 되었습니다.');
  };

  const handleClickLogout = () => {
    openModal(<Logout onClick={logout} />);
  };

  const dropdownItems = useMemo(
    () => [
      { text: '마이 히스토리', href: '/myhistory' },
      { text: '계정 설정', href: '/mypage' },
      { text: '팀 참여', href: '/jointeam' },
      {
        text: '로그아웃',
        onClick: handleClickLogout,
      },
    ],
    [logout],
  );

  if (!user) return null;

  return (
    <DropDown
      trigger={
        <Button variant="link">
          <Profile userName={user.nickname} profileImage={user.image} />
        </Button>
      }
      items={dropdownItems}
      width="mt-pr-20"
    />
  );
}

export default HeadersProfileDropDown;

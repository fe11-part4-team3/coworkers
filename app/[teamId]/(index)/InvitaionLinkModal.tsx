'use client';

import { useMutation } from '@tanstack/react-query';

import CloseButton from '@/components/modal/ModalCloseButton';
import Buttons from '@/components/Buttons';
import createUrlString from '@/utils/createUrlString';
import useGroup from '@/hooks/useGroup';
import { getInvitation } from '@/service/group.api';
import { useSnackbar } from '@/contexts/SnackBar.context';

export default function InvitationLinkModal() {
  const { groupId } = useGroup();
  const { showSnackbar } = useSnackbar();

  const copyLink = (token: string) => {
    const path = createUrlString({
      origin: location.origin,
      pathname: ['/jointeam'],
      queryParams: { token },
    });
    setTimeout(() => navigator.clipboard.writeText(path), 500);
    showSnackbar('초대하기 링크를 클립보드에 복사했습니다.');
  };

  const { mutate: getInvitationMutate, isPending } = useMutation({
    mutationFn: () => getInvitation({ id: groupId }),
    onSuccess: (token) => copyLink(token),
    onError: (error) => showSnackbar(error.message, 'error'),
  });

  const handleOnClick = () => {
    getInvitationMutate();
  };

  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">멤버 초대</h2>
        <p className="modal-subTitle">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </p>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="링크 복사하기"
          onClick={handleOnClick}
          loading={isPending}
          disabled={isPending}
        />
      </div>
    </>
  );
}

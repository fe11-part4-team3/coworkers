import Buttons from '@/components/Buttons';
import useModalStore from '@/stores/modalStore';
import DangerIcon from '@/public/images/icon-danger.svg';

interface GroupDeleteModalProps {
  onDelete: () => void;
}

export default function GroupDeleteModal({ onDelete }: GroupDeleteModalProps) {
  const { closeModal } = useModalStore();

  return (
    <>
      <DangerIcon
        width={24}
        height={24}
        className="mx-auto mb-pr-16"
        onClick={closeModal}
      />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">팀 삭제를 진행하시겠어요?</h2>
        <p className="modal-subTitle">
          모든 할 일 목록은 자동으로 삭제되고, <br />
          모든 멤버들은 팀에서 나가집니다.
        </p>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          onClick={closeModal}
          border="secondary"
          backgroundColor="white"
          textColor="default"
        />
        <Buttons
          text="삭제하기"
          onClick={onDelete}
          backgroundColor="danger"
          loading={false}
        />
      </div>
    </>
  );
}

import { ModalProps } from '@/types/modal.type';

export default function InviteMember({
  isOpen,
  onClose,
  onClick,
}: ModalProps) {
  if (!isOpen) return null;

  const handleOnclick = () => {
    onClick();
    onClose();
  };

  return (
    <div className="absolute flex h-pr-210 w-pr-380 flex-col items-center justify-between rounded-xl bg-popover pb-pr-32 pt-pr-48 font-medium">
      <div className="flex flex-col items-center gap-pr-4">
        <h2 className="text-lg text-t-primary">
          멤버 초대
        </h2>
        <p className="text-sm text-t-secondary">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </p>
      </div>
      <button
        onClick={handleOnclick}
        className="font-semiBold flex h-pr-48 w-pr-280 items-center justify-center rounded-xl bg-brand-primary text-lg text-white"
      >
        링크 복사하기
      </button>
    </div>
  );
}

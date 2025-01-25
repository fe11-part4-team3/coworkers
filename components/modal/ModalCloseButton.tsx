import Image from 'next/image';
import useModalStore from '@/stores/modalStore';

export default function CloseButton({
  closeAlert = false,
}: {
  closeAlert?: boolean;
}) {
  const { closeModal } = useModalStore();

  const handleButtonClick = () => {
    if (closeAlert) {
      const userConfirm = confirm(
        '창을 닫으시겠습니까?\n안에 작성된 내용은 저장되지 않습니다.',
      );
      if (userConfirm) {
        closeModal();
      }
    } else {
      closeModal();
    }
  };

  return (
    <button
      className="absolute right-pr-25 top-pr-16 text-gray-500"
      onClick={handleButtonClick}
    >
      <Image
        width={20}
        height={20}
        src="/images/icon-close.svg"
        alt="닫기 버튼"
      />
    </button>
  );
}

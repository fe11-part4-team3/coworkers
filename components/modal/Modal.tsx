import useModalStore from '@/stores/modalStore';

export default function Modal() {
  const { isOpen, modalContent } = useModalStore();

  if (!isOpen) return null;
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative flex w-pr-384 flex-col items-center justify-between rounded-xl bg-popover px-pr-30 pb-pr-32 pt-pr-40 mo:bottom-0 mo:w-full mo:rounded-b-none"
        onClick={handleContentClick}
      >
        <div className="w-full">{modalContent}</div>
      </div>
    </div>
  );
}

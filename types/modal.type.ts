interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

export type { ModalStore, ModalProps };

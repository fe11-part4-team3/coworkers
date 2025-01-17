interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export type { ModalStore };

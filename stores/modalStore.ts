import { create } from 'zustand';
import { ModalStore } from '@/types/modal.type';

/**
 * modal 상태를 관리하는 zustand store
 *
 * @property {boolean} isOpen - modal이 열려있는지 여부
 * @method openModal - modal을 여는 함수
 * @method closeModal - modal을 닫는 함수
 */

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null }),
}));

export default useModalStore;

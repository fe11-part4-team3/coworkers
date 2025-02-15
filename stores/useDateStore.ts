import { create } from 'zustand';

interface IUseDateStore {
  date: Date;
  setDate: (date: Date) => void;
}

const useDateStore = create<IUseDateStore>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),
}));

export default useDateStore;

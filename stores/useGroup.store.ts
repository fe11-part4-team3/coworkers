import { create } from 'zustand';

import { IGroup } from '@/types/group.type';

const useGroupStore = create<{
  currentGroup: IGroup | null;
  setCurrentGroup: (group: IGroup | null) => void;
}>((set) => ({
  currentGroup: null,
  setCurrentGroup: (group: IGroup | null) => set({ currentGroup: group }),
}));

export default useGroupStore;

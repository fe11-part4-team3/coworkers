import { IGroupDetail, IMember, TaskListSummary } from '@/types/group.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUseGroupStore {
  group: IGroupDetail | null;
  members: IMember[] | null;
  taskLists: TaskListSummary[] | null;
  setGroup: (group: IGroupDetail | null) => void;
  setMembers: (members: IMember[] | null) => void;
  setTaskLists: (taskLists: TaskListSummary[] | null) => void;
  clearStore: () => void;
}

/**
 * 현재 경로상 위치한 그룹(팀)과 관련된 데이터를 관리합니다.
 *
 * @name `group-store`
 *
 * @interface `IUseGroupStore`
 * @property `group` : 현재 위치한 그룹(팀) 데이터
 * @property `members` : 현제 그룹에 속한 멤버 목록 데이터
 * @property `taskLists` : 현재 그룹에 속한 할 일 목록 배열 데이터
 * @property `setGroup` : 그룹 데이터 설정 함수
 * @property `setMembers` : 멤버 목록 데이터 설정 함수
 * @property `settaskLists` : 할 일 목록 배열 설정 함수
 * @property `clearStore` : 저장소에서 관리하는 데이터 `null`로 초기화
 */
const useGroupStore = create(
  persist<IUseGroupStore>(
    (set) => ({
      group: null,
      members: null,
      taskLists: null,
      setGroup: (group) => set({ group }),
      setMembers: (members) => set({ members }),
      setTaskLists: (taskLists) => set({ taskLists }),
      clearStore: () => set({ group: null, members: null, taskLists: null }),
    }),
    {
      name: 'group-store',
    },
  ),
);

export default useGroupStore;

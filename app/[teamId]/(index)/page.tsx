'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Container from '@/components/layout/Container';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';
import {
  createTaskList,
  deleteTaskList,
  updateTaskList,
} from '@/service/taskList.api';
import NotFound from '@/app/404/NotFound';
import useTaskLists from '@/hooks/useTaskLists';
import useModalStore from '@/stores/modalStore';
import {
  deleteGroup,
  deleteMember,
  getTasksInGroup,
  updateGroup,
} from '@/service/group.api';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useDate from '@/hooks/useDate';

import GroupHeader from './GroupHeader';
import GroupMemberList from './GroupMemberList';
import GroupTaskListWrapper from './GroupTaskListWrapper';
import {
  _CreateTaskListParams,
  _DeleteMemberParams,
  _DeleteTaskListParams,
  _UpdateGroupParams,
  _UpdateTaskListParams,
} from './TeamPage.type';
import GroupReport from './GroupReport';

export default function TeamPage() {
  const router = useRouter();
  const { reload: refetchUser } = useUser(true);
  const { date, now } = useDate();
  const {
    group,
    groupId,
    membership,
    members,
    refetch: refetchGroup,
    isPending,
  } = useGroup();
  const { taskLists, refetchById, removeById, removeAll } = useTaskLists();
  const { closeModal } = useModalStore();
  const { showSnackbar } = useSnackbar();

  const role = membership?.role || 'MEMBER';

  const { data: tasks, refetch: refetchTasks } = useQuery({
    queryKey: groupId ? ['tasks', groupId] : [],
    queryFn: () =>
      getTasksInGroup({
        id: group?.id as number,
        date,
      }),
    initialData: [],
    enabled: !!group,
  });

  const { mutate: onEditGroup } = useMutation({
    mutationFn: (params: _UpdateGroupParams) => _updateGroup(params),
    onSuccess: () => {
      closeModal();
      refetchUser();
      refetchGroup();
    },
    onError: (error) => alert(error),
  });
  const _updateGroup = (params: _UpdateGroupParams) => {
    if (!group) throw new Error('수정할 팀이 없습니다');
    if (role !== 'ADMIN') throw new Error('관리자만 팀을 수정할 수 있습니다.');
    return updateGroup({ id: group.id, ...params });
  };

  const { mutate: onDeleteGroup } = useMutation({
    mutationFn: () => _deleteGroup(),
    onSuccess: () => {
      closeModal();
      router.push('/');
      removeAll();
      refetchUser();
      refetchGroup();
      showSnackbar('팀을 삭제했습니다.');
    },
    onError: (error) => showSnackbar(error.message, 'error'),
  });
  const _deleteGroup = () => {
    if (!group) throw new Error('삭제할 팀이 없습니다');
    if (role !== 'ADMIN') throw new Error('관리자만 팀을 삭제할 수 있습니다.');
    return deleteGroup({ id: group.id });
  };

  const { mutate: onCreateTaskList } = useMutation({
    mutationFn: (params: _CreateTaskListParams) => _createTaskList(params),
    onSuccess: () => {
      closeModal();
      refetchGroup();
      showSnackbar('할 일 목록을 생성했습니다.');
    },
    onError: (error) => showSnackbar(error.message, 'error'),
  });
  const _createTaskList = (params: _CreateTaskListParams) => {
    if (!group) throw new Error('목록을 생성할 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 목록을 생성할 수 있습니다.');
    return createTaskList({ groupId: group.id, ...params });
  };

  const { mutate: onEditTaskList } = useMutation({
    mutationFn: (params: _UpdateTaskListParams) => _updateTaskList(params),
    onSuccess: ({ id }) => {
      refetchById(id);
      closeModal();
      showSnackbar('할 일 목록을 수정했습니다.');
    },
    onError: (error) => showSnackbar(error.message, 'error'),
  });
  const _updateTaskList = (params: _UpdateTaskListParams) => {
    if (!group) throw new Error('수정할 목록의 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 목록을 수정할 수 있습니다.');
    return updateTaskList({ groupId: group.id, ...params });
  };

  const { mutate: onDeleteTaskList } = useMutation({
    mutationFn: (params: _DeleteTaskListParams) => _deleteTaskList(params),
    onSuccess: ({ id }) => {
      removeById(id);
      closeModal();
      showSnackbar('할 일 목록을 삭제했습니다.');
    },
    onError: (error) => showSnackbar(error.message, 'error'),
  });
  const _deleteTaskList = async (params: _DeleteTaskListParams) => {
    if (!group) throw new Error('삭제할 목록의 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 목록을 삭제할 수 있습니다.');
    return deleteTaskList({ groupId: group.id, ...params });
  };

  const { mutate: onDeleteMember } = useMutation({
    mutationFn: (params: _DeleteMemberParams) => _deleteMember(params),
    onSuccess: () => {
      refetchGroup();
      closeModal();
      showSnackbar('멤버를 삭제했습니다.');
    },
    onError: (error) => showSnackbar(error.message, 'error'),
  });
  const _deleteMember = async (params: _DeleteMemberParams) => {
    if (!group) throw new Error('삭제할 멤버의 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 멤버를 삭제할 수 있습니다.');
    return deleteMember({ id: group?.id, ...params });
  };

  useEffect(() => now(), []);

  useEffect(() => {
    refetchTasks();
  }, [date]);

  //TODO 그룹 데이터 로딩 중. 로딩 컴포넌트 보여주기
  if (!group && isPending) return null;

  //팀이 없을 경우
  if (!group) return <NotFound />;

  return (
    <Container>
      <div className="mb-pr-84 flex flex-col gap-pr-24 pt-pr-24">
        <GroupHeader
          role={role}
          group={group}
          onEdit={onEditGroup}
          onDelete={onDeleteGroup}
        />
        <GroupTaskListWrapper
          role={role}
          taskLists={taskLists}
          onCreate={onCreateTaskList}
          onEdit={onEditTaskList}
          onDelete={onDeleteTaskList}
        />
        <GroupReport tasks={tasks} taskLists={taskLists} />
        <GroupMemberList
          role={role}
          groupId={group.id}
          members={members}
          onDelete={onDeleteMember}
        />
      </div>
    </Container>
  );
}

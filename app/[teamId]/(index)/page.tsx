'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

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
import { getTasksInGroup, updateGroup } from '@/service/group.api';
import useModalStore from '@/stores/modalStore';

import GroupHeader from './GroupHeader';
import GroupMemberList from './GroupMemberList';
import GroupTaskListWrapper from './GroupTaskListWrapper';
import {
  _CreateTaskListParams,
  _DeleteTaskListParams,
  _UpdateGroupParams,
  _UpdateTaskListParams,
} from './TeamPage.type';
import GroupReport from './GroupReport';
import { useSnackbar } from '@/contexts/SnackBar.context';

export default function TeamPage() {
  const params = useParams();
  const safeParams = React.useMemo(() => params, [params]);
  const { teamId } = safeParams;
  const { memberships, reload } = useUser(true);
  const { group, members, refetch, isPending } = useGroup(Number(teamId));
  const { taskLists, refetchById, removeById } = useTaskLists();
  const { closeModal } = useModalStore();
  const { showSnackbar } = useSnackbar();

  const currentMembership = memberships?.find(
    (membership) => membership.groupId === group?.id,
  );

  const role = currentMembership?.role || 'MEMBER';

  const { data: tasks } = useQuery({
    queryKey: ['tasks', group?.id],
    queryFn: () => {
      return group
        ? getTasksInGroup({ id: group.id, date: new Date().toISOString() })
        : [];
    },
    initialData: [],
  });

  const { mutate: onEditGroup } = useMutation({
    mutationFn: (params: _UpdateGroupParams) => _updateGroup(params),
    onSuccess: () => {
      closeModal();
      reload();
      refetch();
    },
    onError: (error) => alert(error),
  });
  const _updateGroup = (params: _UpdateGroupParams) => {
    if (!group) throw new Error('수정할 팀이 없습니다');
    if (role !== 'ADMIN') throw new Error('관리자만 팀을 수정할 수 있습니다.');
    return updateGroup({ id: group.id, ...params });
  };

  const { mutate: onCreateTaskList } = useMutation({
    mutationFn: (params: _CreateTaskListParams) => _createTaskList(params),
    onSuccess: () => {
      closeModal();
      refetch();
      showSnackbar('할 일 목록을 생성했습니다.');
    },
    onError: (error) => alert(error),
  });
  const _createTaskList = (params: _CreateTaskListParams) => {
    if (!group) throw new Error('목록을 생성할 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 목록을 생성할 수 있습니다.');
    return createTaskList({ groupId: group.id, ...params });
  };

  const { mutate: onEditTaskList } = useMutation({
    mutationFn: (params: _UpdateTaskListParams) => _updateTaskList(params),
    onSuccess: ({ id }) => refetchById(id),
    onError: (error) => alert(error),
  });
  const _updateTaskList = (params: _UpdateTaskListParams) => {
    if (!group) throw new Error('수정할 목록의 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 목록을 수정할 수 있습니다.');
    return updateTaskList({ groupId: group.id, ...params });
  };

  const { mutate: onDeleteTaskList } = useMutation({
    mutationFn: (params: _DeleteTaskListParams) => _deleteTaskList(params),
    onSuccess: ({ id }) => removeById(id),
    onError: (error) => alert(error),
  });
  const _deleteTaskList = async (params: _DeleteTaskListParams) => {
    if (!group) throw new Error('삭제할 목록의 팀이 없습니다');
    if (role !== 'ADMIN')
      throw new Error('관리자만 목록을 삭제할 수 있습니다.');
    return deleteTaskList({ groupId: group.id, ...params });
  };

  //TODO 그룹 데이터 로딩 중. 로딩 컴포넌트 보여주기
  if (!group && isPending) return null;

  //팀이 없을 경우
  if (!group) return <NotFound />;

  return (
    <Container>
      <div className="flex flex-col gap-pr-24 pt-pr-24">
        <GroupHeader role={role} group={group} onEdit={onEditGroup} />
        <GroupTaskListWrapper
          role={role}
          taskLists={taskLists}
          onCreate={onCreateTaskList}
          onEdit={onEditTaskList}
          onDelete={onDeleteTaskList}
        />
        <GroupReport tasks={tasks} taskLists={taskLists} />
        <GroupMemberList role={role} groupId={group.id} members={members} />
      </div>
    </Container>
  );
}

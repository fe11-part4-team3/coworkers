'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

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
import { getTasksInGroup } from '@/service/group.api';

import GroupHeader from './GroupHeader';
import GroupMemberList from './GroupMemberList';
import GroupTaskListWrapper from './GroupTaskListWrapper';
import {
  _CreateTaskListParams,
  _DeleteTaskListParams,
  _UpdateTaskListParams,
} from './TeamPage.type';
import GroupReport from './GroupReport';

export default function TeamPage() {
  useUser(true);
  const { teamId } = useParams();
  const { group, members, refetch } = useGroup(Number(teamId));
  const { taskLists, refetchById, removeById } = useTaskLists();

  const { data: tasks } = useQuery({
    queryKey: ['tasks', group?.id],
    queryFn: () => {
      return group
        ? getTasksInGroup({ id: group.id, date: new Date().toISOString() })
        : [];
    },
    initialData: [],
  });

  const { mutate: onCreate } = useMutation({
    mutationFn: (params: _CreateTaskListParams) => _createTaskList(params),
    onSuccess: () => refetch(),
    onError: (error) => alert(error),
  });
  const { mutate: onEdit } = useMutation({
    mutationFn: (params: _UpdateTaskListParams) => _updateTaskList(params),
    onSuccess: ({ id }) => refetchById(id),
    onError: (error) => alert(error),
  });
  const { mutate: onDelete } = useMutation({
    mutationFn: (params: _DeleteTaskListParams) => _deleteTaskList(params),
    onSuccess: ({ id }) => removeById(id),
    onError: (error) => alert(error),
  });

  const _createTaskList = (params: _CreateTaskListParams) => {
    if (!group) throw new Error('목록을 생성할 팀이 없습니다');
    return createTaskList({ groupId: group.id, ...params });
  };

  const _updateTaskList = (params: _UpdateTaskListParams) => {
    if (!group) throw new Error('수정할 목록의 팀이 없습니다');
    return updateTaskList({ groupId: group.id, ...params });
  };

  const _deleteTaskList = async (params: _DeleteTaskListParams) => {
    if (!group) throw new Error('삭제할 목록의 팀이 없습니다');
    return deleteTaskList({ groupId: group.id, ...params });
  };

  // teamId가 숫자가 아니라면 또는 4자리 숫자가 아니라면
  if (typeof teamId !== 'number' || teamId < 1000 || teamId > 9999) {
    return <NotFound />;
  }

  if (!group) return null;

  return (
    <Container>
      <div className="flex flex-col gap-pr-24 pt-pr-24">
        <GroupHeader name={group.name} />
        <GroupTaskListWrapper
          taskLists={taskLists}
          onCreate={onCreate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <GroupReport tasks={tasks} taskLists={taskLists} />
        <GroupMemberList groupId={group.id} members={members} />
      </div>
    </Container>
  );
}

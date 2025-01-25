'use client';

import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import Container from '@/components/layout/Container';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';
import {
  createTaskList,
  deleteTaskList,
  updateTaskList,
} from '@/service/taskList.api';

import GroupHeader from './GroupHeader';
import GroupMemberList from './GroupMemberList';
import GroupTaskListWrapper from './GroupTaskListWrapper';

export interface _UpdateTaskListParams {
  id: number;
  name: string;
}

export default function TeamPage() {
  useUser(true);
  const { teamId } = useParams();
  const { group, members, taskLists, reload } = useGroup(Number(teamId));
  const { mutate: onCreate } = useMutation({
    mutationFn: (name: string) => _createTaskList(name),
    onSuccess: () => reload(),
    onError: (error) => alert(error),
  });
  const { mutate: onEdit } = useMutation({
    mutationFn: ({ id, name }: _UpdateTaskListParams) =>
      _updateTaskList({ id, name }),
    onSuccess: () => reload(),
    onError: (error) => alert(error),
  });
  const { mutate: onDelete } = useMutation({
    mutationFn: (id: number) => _deleteTaskList(id),
    onSuccess: () => reload(),
    onError: (error) => alert(error),
  });

  const _createTaskList = (name: string) => {
    if (!group) throw new Error('목록을 생성할 팀이 없습니다');
    return createTaskList({ groupId: group.id, name });
  };

  const _updateTaskList = ({ id, name }: _UpdateTaskListParams) => {
    if (!group) throw new Error('수정할 목록의 팀이 없습니다');
    return updateTaskList({ groupId: group.id, id, name });
  };

  const _deleteTaskList = (taskListId: number) => {
    if (!group) throw new Error('삭제할 목록의 팀이 없습니다');
    return deleteTaskList({ groupId: group.id, id: taskListId });
  };

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
        <GroupMemberList groupId={group.id} members={members} />
      </div>
    </Container>
  );
}

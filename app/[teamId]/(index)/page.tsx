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

export interface _CreateTaskListParams {
  name: string;
}

export interface _UpdateTaskListParams {
  id: number;
  name: string;
}

export interface _DeleteTaskListParams {
  id: number;
}

export default function TeamPage() {
  useUser(true);
  const { teamId } = useParams();
  const { group, members, taskLists, reload } = useGroup(Number(teamId));
  const { mutate: onCreate } = useMutation({
    mutationFn: (params: _CreateTaskListParams) => _createTaskList(params),
    onSuccess: () => reload(),
    onError: (error) => alert(error),
  });
  const { mutate: onEdit } = useMutation({
    mutationFn: (params: _UpdateTaskListParams) => _updateTaskList(params),
    onSuccess: () => reload(),
    onError: (error) => alert(error),
  });
  const { mutate: onDelete } = useMutation({
    mutationFn: (params: _DeleteTaskListParams) => _deleteTaskList(params),
    onSuccess: () => reload(),
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

  const _deleteTaskList = (params: _DeleteTaskListParams) => {
    if (!group) throw new Error('삭제할 목록의 팀이 없습니다');
    return deleteTaskList({ groupId: group.id, ...params });
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

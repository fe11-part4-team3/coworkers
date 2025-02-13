import {
  AcceptInvitationParams,
  CreateGroupParams,
  CreateGroupResponse,
  DeleteGroupParams,
  DeleteGroupResponse,
  DeleteMemberParams,
  GetGroupParams,
  GetInvitationParams,
  GetMemberParams,
  GetTasksInGroupParams,
  IGroup,
  IGroupDetail,
  IMember,
  InviteMemberParams,
  UpdateGroupParams,
} from '@/types/group.type';
import { ITask } from '@/types/task.type';

import instance from './axios';

const getGroup = async ({ id }: GetGroupParams): Promise<IGroupDetail> => {
  const response = await instance.get(`/groups/${id}`);
  return response.data;
};

/**
 * @param {string} params.image 이미지의 url
 * @param {string} params.name 1~30자 제한
 */
const updateGroup = async ({
  id,
  image,
  name,
}: UpdateGroupParams): Promise<IGroup> => {
  const response = await instance.patch(`/groups/${id}`, {
    image,
    name,
  });
  return response.data;
};

const deleteGroup = async ({
  id,
}: DeleteGroupParams): Promise<DeleteGroupResponse> => {
  const response = await instance.delete(`/groups/${id}`);
  return { success: response.status === 204, id };
};

/**
 * @param {string} params.image 이미지의 url
 * @param {string} params.name 1~30자 제한
 */
const createGroup = async ({
  image,
  name,
}: CreateGroupParams): Promise<CreateGroupResponse> => {
  const response = await instance.post('/groups', {
    image,
    name,
  });
  return response.data;
};

/**
 * ```
 * 그룹에 소속된 유저 조회
 * 그룹 조회(GET /groups/:id)시,
 * 멤버로 가입된 유저 목록도 함께 조회됨.
 *```
 */
const getMember = async ({
  id,
  memberUserId,
}: GetMemberParams): Promise<IMember> => {
  const path = `/groups/${id}/member/${memberUserId}`;
  const response = await instance.get(path);
  return response.data;
};

const deleteMember = async ({
  id,
  memberUserId,
}: DeleteMemberParams): Promise<boolean> => {
  const path = `/groups/${id}/member/${memberUserId}`;
  const response = await instance.delete(path);
  return response.status === 204;
};

/**
 * ### 초대 링크용 토큰 생성
 * ```
 * 초대 링크에 토큰을 포함시켜서,
 * 초대 링크를 받은 사용자가 접속시,
 * 토큰을 사용해서 초대를 수락하여
 * 스스로를 그룹에 포함시키게 됨.
 * ```
 */
const getInvitation = async ({ id }: GetInvitationParams): Promise<string> => {
  const path = `/groups/${id}/invitation`;
  const response = await instance.get(path);
  return response.data;
};

/**
 * `GET {id}/invitation`으로 생성한 토큰으로, 초대를 수락하는 엔드포인트
 * @param params.userEmail 초대를 수락하는 유저의 이메일
 * @param params.token 초대 링크에 포함되어있는 토큰
 * @returns 초대를 수락한 그룹의 id
 */
const acceptInvitation = async ({
  userEmail,
  token,
}: AcceptInvitationParams): Promise<number> => {
  const path = '/groups/accept-invitation';
  const response = await instance.post(path, {
    userEmail,
    token,
  });
  return response.data.groupId;
};

/**
 * 초대 링크없이 그룹에 유저를 추가하는 엔드포인트
 */
const inviteMember = async ({
  id,
  userEmail,
}: InviteMemberParams): Promise<boolean> => {
  const path = `/groups/${id}/member`;
  const response = await instance.post(path, { userEmail });
  return response.status === 204;
};

const getTasksInGroup = async ({
  id,
  date,
}: GetTasksInGroupParams): Promise<ITask[]> => {
  const path = `/groups/${id}/tasks`;
  const response = await instance.get(path, {
    params: {
      date,
    },
  });
  return response.data;
};

export {
  getGroup,
  updateGroup,
  deleteGroup,
  createGroup,
  getMember,
  deleteMember,
  getInvitation,
  acceptInvitation,
  inviteMember,
  getTasksInGroup,
};

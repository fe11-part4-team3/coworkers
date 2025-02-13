// enum Role {
//   ADMIN,
//   MEMBER,
// }

interface IGroup {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
}

type RoleType = 'ADMIN' | 'MEMBER';

interface IMember {
  role: RoleType;
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface ITaskListSummary {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: string[];
}

interface IGroupDetail extends IGroup {
  members: IMember[];
  taskLists: ITaskListSummary[];
}

interface GetGroupParams {
  id: number;
}

interface UpdateGroupParams {
  id: number;
  image?: string;
  name?: string;
}

interface DeleteGroupParams {
  id: number;
}

interface CreateGroupParams {
  image?: string;
  name: string;
}

interface CreateGroupResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
}

interface DeleteGroupResponse {
  success: boolean;
  id: number;
}

interface GetMemberParams {
  id: number;
  memberUserId: number;
}

interface DeleteMemberParams {
  id: number;
  memberUserId: number;
}

interface GetInvitationParams {
  id: number;
}

interface AcceptInvitationParams {
  userEmail: string;
  token: string;
}

interface InviteMemberParams {
  userEmail: string;
  id: number;
}

interface GetTasksInGroupParams {
  id: number;
  date: string;
}

// export { Role };
export type {
  IMember,
  RoleType,
  IGroup,
  ITaskListSummary,
  IGroupDetail,
  GetGroupParams,
  UpdateGroupParams,
  DeleteGroupParams,
  CreateGroupParams,
  CreateGroupResponse,
  DeleteGroupResponse,
  GetMemberParams,
  DeleteMemberParams,
  GetInvitationParams,
  AcceptInvitationParams,
  InviteMemberParams,
  GetTasksInGroupParams,
};

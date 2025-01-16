enum Role {
  ADMIN,
  MEMBER,
}

interface IGroup {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
}

interface IMember {
  role: Role;
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface TaskListSummary {
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
  taskLists: TaskListSummary[];
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
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
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

export { Role };
export type {
  IMember,
  IGroup,
  TaskListSummary,
  IGroupDetail,
  GetGroupParams,
  UpdateGroupParams,
  DeleteGroupParams,
  CreateGroupParams,
  CreateGroupResponse,
  GetMemberParams,
  DeleteMemberParams,
  GetInvitationParams,
  AcceptInvitationParams,
  InviteMemberParams,
  GetTasksInGroupParams,
};

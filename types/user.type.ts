enum Role {
  ADMIN,
  MEMBER,
}

enum FrequencyType {
  DAILY,
  WEEKLY,
  MONTHLY,
  ONCE,
}

interface IUser {
  teamId: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: IMembership[];
}

interface IMembership {
  group: IGroup;
  role: Role;
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface IGroup {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
}

interface UpdateUserParams {
  nickname?: string;
  image?: string;
}

interface ITask {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}

interface ResetPasswordEmailParams {
  email: string;
  redirectUrl: string;
}
interface ResetPasswordParams extends UpdatePasswordParams {
  token: string;
}

interface UpdatePasswordParams {
  passwordConfirmation: string;
  password: string;
}

export type {
  IUser,
  IMembership,
  IGroup,
  UpdateUserParams,
  ITask,
  ResetPasswordEmailParams,
  ResetPasswordParams,
  UpdatePasswordParams,
};

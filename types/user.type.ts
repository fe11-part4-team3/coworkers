enum Role {
  ADMIN,
  MEMBER,
}

interface IUserProfile {
  image: string | null;
  nickname: string;
  id: number;
}

interface IUser extends IUserProfile {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  email: string;
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
  IUserProfile,
  IUser,
  IMembership,
  IGroup,
  UpdateUserParams,
  ResetPasswordEmailParams,
  ResetPasswordParams,
  UpdatePasswordParams,
};

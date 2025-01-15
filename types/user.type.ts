import { IGroup, IMember } from './group.type';

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

interface IMembership extends IMember {
  group: IGroup;
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
  UpdateUserParams,
  ResetPasswordEmailParams,
  ResetPasswordParams,
  UpdatePasswordParams,
};

import { FormValue } from '@/hooks/useForm';

import { IGroup, IMember } from './group.type';

interface IMembership extends IMember {
  group: IGroup;
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
}

interface IUserDetail extends IUser {
  memberships: IMembership[];
}

interface UpdateUserParams {
  nickname?: string;
  image?: string;
}

interface ResetPasswordEmailParams {
  email: string;
  redirectUrl: string;
  [key: string]: FormValue;
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
  IUserDetail,
  IMembership,
  UpdateUserParams,
  ResetPasswordEmailParams,
  ResetPasswordParams,
  UpdatePasswordParams,
};

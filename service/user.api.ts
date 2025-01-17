import {
  IMembership,
  UpdateUserParams,
  IUserDetail,
  ResetPasswordEmailParams,
  ResetPasswordParams,
  UpdatePasswordParams,
} from '@/types/user.type';
import { ITaskMetadata } from '@/types/task.type';
import { IGroup } from '@/types/group.type';

import instance from './axios';

/**
 * **※인증 필요**
 */
const getUser = async (
  accessToken: string | null,
): Promise<IUserDetail | null> => {
  if (!accessToken) {
    return null;
  } else {
    try {
      const response = await instance.get('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        '유저 정보를 불러오지 못했습니다.',
        error,
      );
      return null;
    }
  }
};

/**
 * **※인증 필요**
 *
 * 계정 생성 시 image의 초기값은 `null`이미지만 한 번 변경한 이후 다시 null로는 변경할 수 없습니다.
 */
const updateUser = async ({
  nickname,
  image,
}: UpdateUserParams): Promise<string> => {
  const response = await instance.patch('/user', {
    nickname,
    image,
  });
  return response.data.message;
};

/**
 * **※인증 필요**
 *
 * 회원 탈퇴
 */
const deleteUser = async (
  accessToken: string | null,
): Promise<boolean> => {
  const response = await instance.delete('/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.status === 204;
};

/**
 * **※인증 필요**
 */
const getGroupList = async (
  accessToken: string | null,
): Promise<IGroup[]> => {
  const response = await instance.get('/user/groups', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

/**
 * **※인증 필요**
 */
const getMembershipList = async (
  accessToken: string | null,
): Promise<IMembership[]> => {
  const response = await instance.get('/user/memberships', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

/**
 * **※인증 필요**
 *
 * 완료한 작업 조회
 */
const getHistory = async (
  accessToken: string | null,
): Promise<ITaskMetadata[]> => {
  const response = await instance.get('/user/history', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.taskDone;
};

/**
 * **※인증 불필요**
 * 비밀번호 재설정 이메일 전송
 * - {redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다.
 * - e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"
 */
const resetPasswordEmail = async ({
  email,
  redirectUrl,
}: ResetPasswordEmailParams): Promise<string> => {
  const response = await instance.post(
    '/user/send-reset-password-email',
    {
      email,
      redirectUrl,
    },
  );
  return response.data.message;
};

/**
 * **※인증 불필요**
 *
 * 이메일로 전달받은 링크에서 비밀번호 초기화
 * - POST user/send-reset-password-email 요청으로 발송한 메일의 링크에 담긴 토큰을 사용해야 합니다.
 */
const resetPassword = async ({
  passwordConfirmation,
  password,
  token,
}: ResetPasswordParams) => {
  const response = await instance.patch(
    '/user/reset-password',
    {
      passwordConfirmation,
      password,
      token,
    },
  );
  return response.data.message;
};

/**
 * **※인증 필요**
 */
const updatePassword = async ({
  passwordConfirmation,
  password,
}: UpdatePasswordParams): Promise<string> => {
  const response = await instance.patch('/user/password', {
    passwordConfirmation,
    password,
  });
  return response.data.message;
};

export {
  getUser,
  updateUser,
  deleteUser,
  getGroupList,
  getMembershipList,
  getHistory,
  resetPasswordEmail,
  resetPassword,
  updatePassword,
};

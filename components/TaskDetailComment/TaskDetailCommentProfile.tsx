import { IUserProfile } from '@/types/user.type';

import Profile from '../Profile/Profile';

/**
 * @param {object} props.user - 유저 데이터
 * @returns {JSX.Element} - 프로필 컴포넌트
 */
function TaskDetailCommentProfile({ user }: { user: IUserProfile }) {
  const { nickname, image } = user;

  return (
    <div className="flex items-center">
      <Profile variant="member" profileSize={32} defaultProfile={image} />
      <span className="ml-pr-12 text-14m">{nickname}</span>
    </div>
  );
}

export default TaskDetailCommentProfile;

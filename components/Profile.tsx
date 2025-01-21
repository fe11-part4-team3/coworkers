import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

interface ProfileProp {
  user: {
    id: number;
    nickname: string;
    image?: string | null;
  };
}

const DEFAULT_PROFILE = '/images/icon-profile-member-default.svg';

/**
 * @param {object} props.user - 유저 데이터
 * @returns {JSX.Element} 프로필 컴포넌트
 */
function Profile({ user }: ProfileProp) {
  const { nickname, image } = user;

  return (
    <div className="flex items-center">
      <Avatar className="size-pr-32">
        <AvatarImage src={image || DEFAULT_PROFILE} className="rounded-full" />
      </Avatar>

      <span className="ml-pr-12 text-14m text-t-primary">{nickname}</span>
    </div>
  );
}

export default Profile;

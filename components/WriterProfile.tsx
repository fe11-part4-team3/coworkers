import Profile from '@/components/Profile/Profile';
import { IWriter } from '@/types/article.type';

/**
 * @param {number} props.id - 게시글 작성자 유저 id
 * @param {string} props.nickname - 게시글 작성자 유저 닉네임
 * @returns {JSX.Element} 게시글 카드의 작성자 프로필 컴포넌트
 */
function WriterProfile({ writer }: { writer: IWriter }) {
  const { nickname } = writer;

  return (
    <div className="flex items-center">
      <Profile variant="member" profileSize={32} />
      <span className="ml-pr-12 text-14m mo:text-12m">{nickname}</span>
    </div>
  );
}

export default WriterProfile;

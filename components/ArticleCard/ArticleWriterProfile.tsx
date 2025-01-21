import Profile from '../Profile/Profile';

function ArticleWriterProfile({
  writer,
}: {
  writer: {
    nickname: string;
  };
}) {
  const { nickname } = writer;

  return (
    <div className="flex items-center">
      <Profile variant="member" profileSize={32} />
      <span className="ml-pr-12 text-14m mo:text-12m">{nickname}</span>
    </div>
  );
}

export default ArticleWriterProfile;

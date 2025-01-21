import { dotDate } from '@/utils/dateConversion';

function ArticleDate({ createdAt }: { createdAt: string }) {
  const date = dotDate(createdAt);

  return <p className="text-14m text-t-disabled mo:text-12m">{date}</p>;
}

export default ArticleDate;

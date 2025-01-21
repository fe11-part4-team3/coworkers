import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import BestLabel from './BestLabel';
import ArticleTitle from './ArticleTitle';
import ArticleImg from './ArticleImg';
import LikeCount from '../LikeCount';
import Profile from '../Profile';
import { IArticle } from '@/types/article.type';
import ArticleDate from './ArticleDate';

function ArticleCard({
  type,
  articleData,
}: {
  type: 'best' | 'normal';
  articleData: IArticle;
}) {
  const { title, image, createdAt, writer, likeCount } = articleData;
  const bestArticle = type === 'best';

  return (
    <Card
      className={`${bestArticle ? 'w-pr-387' : 'w-pr-590'} ${bestArticle ? 'h-pr-220' : 'h-pr-176'} border border-none border-b-tertiary bg-b-secondary px-pr-24 pb-pr-16 pt-pr-8 text-16sb`}
    >
      {bestArticle && (
        <CardHeader className="p-0">
          <BestLabel />
        </CardHeader>
      )}

      <CardContent className="mt-pr-14 p-0">
        <div className="mb-pr-12 flex justify-between">
          <ArticleTitle title={title} />

          {image !== null && <ArticleImg src="/images/codeitprofile.png" />}
        </div>

        <ArticleDate createdAt={createdAt} />
      </CardContent>

      <CardFooter className="mt-pr-39 flex justify-between p-0">
        <Profile user={writer} />
        <LikeCount type="readOnly" likeCount={likeCount} />
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;

import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import BestLabel from './BestLabel';
import ArticleTitle from './ArticleTitle';
import ArticleImg from './ArticleImg';
import LikeCount from '../LikeCount';
import Profile from '../Profile';
import { IArticle } from '@/types/article.type';
import { dotDate } from '@/utils/dateConversion';
import ArticleDate from './ArticleDate';

function BestArticleCard({ articleData }: { articleData: IArticle }) {
  const { title, image, createdAt, writer, likeCount } = articleData;
  const date = dotDate(createdAt);

  return (
    <Card className="flex h-pr-220 w-pr-387 flex-col border border-b-tertiary bg-b-secondary px-pr-24 pb-pr-16 pt-pr-13 text-16sb mo:h-pr-178 mo:w-full mo:w-pr-343 mo:px-pr-16 mo:pt-pr-10 ta:w-pr-340">
      <CardHeader className="mb-pr-14 p-0 mo:mb-pr-10">
        <BestLabel />
      </CardHeader>

      <CardContent className="p-0">
        <div className="mb-pr-12 flex justify-between mo:mb-0">
          <ArticleTitle title={title} />

          {image !== null && <ArticleImg src="/images/codeitprofile.png" />}
        </div>

        <ArticleDate createdAt={date} />
      </CardContent>

      <CardFooter className="mt-auto flex-col items-start p-0 mo:mt-auto">
        <div className="flex w-full justify-between">
          <Profile user={writer} />
          <LikeCount type="readOnly" likeCount={likeCount} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default BestArticleCard;

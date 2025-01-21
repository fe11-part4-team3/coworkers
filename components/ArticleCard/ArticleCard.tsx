import { Card, CardContent, CardFooter } from '../ui/card';
import ArticleTitle from './ArticleTitle';
import LikeCount from '../LikeCount';
import Profile from '../Profile';
import { IArticle } from '@/types/article.type';
import { dotDate } from '@/utils/dateConversion';
import ArticleDate from './ArticleDate';
import ArticleDropDown from './ArticleDropDown';

function ArticleCard({ articleData }: { articleData: IArticle }) {
  const { title, image, createdAt, writer, likeCount } = articleData;
  const date = dotDate(createdAt);

  return (
    <Card className="flex h-pr-176 w-pr-590 flex-col border border-b-tertiary bg-b-secondary px-pr-32 py-pr-24 text-16sb mo:relative mo:px-pr-16 tamo:w-full">
      <CardContent className="flex h-pr-72 justify-between p-0 mo:h-pr-64">
        <ArticleTitle title={title} />

        <ArticleDropDown image={image} />
      </CardContent>
      <CardFooter className="mt-pr-24 flex justify-between p-0 mo:mt-0 mo:items-end">
        <div className="flex items-center mo:flex-col-reverse mo:items-start">
          <Profile user={writer} />

          <div className="relative pl-pr-32 before:absolute before:left-pr-16 before:top-1/2 before:inline-block before:h-pr-12 before:w-pr-1 before:-translate-y-1/2 before:bg-t-disabled before:content-[''] mo:mb-pr-16 mo:pl-0 mo:before:content-none">
            <ArticleDate createdAt={date} />
          </div>
        </div>

        <div className="mo:mb-pr-8 mo:pr-pr-24">
          <LikeCount type="readOnly" likeCount={likeCount} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;

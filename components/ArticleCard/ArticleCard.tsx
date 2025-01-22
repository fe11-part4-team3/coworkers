import { IArticle } from '@/types/article.type';
import { Card } from '@/components/ui/card';
import { dotDate } from '@/utils/dateConversion';
import BestMedal from '@/public/images/icon-medal.svg';

import ArticleCardContent from './ArticleCardContent';
import ArticleCardFooter from './ArticleCardFooter';

const CARD_STYLE =
  'flex flex-col border border-b-tertiary bg-b-secondary text-16sb mo:relative mo:w-full mo:px-pr-16';
const NORMAL_STYLE =
  'h-pr-176 w-pr-590 px-pr-32 py-pr-24 mo:h-pr-162 mo:pb-pr-16 ta:w-full';
const BEST_STYLE =
  'relative h-pr-220 w-pr-387 px-pr-24 pb-pr-16 pt-pr-48 mo:h-pr-178 mo:pt-pr-40 ta:w-pr-340';

/**
 * @param {'normal' | 'best'} props.type - 게시글 카드 타입 (normal type default)
 * @param {object} props.articleData - 게시글 데이터
 * @returns {JSX.Element} 베스트, 일반 게시글 카드 컴포넌트
 */
function ArticleCard({
  type = 'normal',
  articleData,
}: {
  type?: 'normal' | 'best';
  articleData: IArticle;
}) {
  const { title, image, createdAt, writer, likeCount } = articleData;
  const isBestCard = type === 'best';

  return (
    <Card className={`${CARD_STYLE} ${isBestCard ? BEST_STYLE : NORMAL_STYLE}`}>
      {isBestCard && (
        <div className="absolute top-pr-13 flex items-center">
          <BestMedal />
          <span className="ml-pr-4 text-16sb mo:text-14sb">Best</span>
        </div>
      )}

      <ArticleCardContent title={title} image={image} isBestCard={isBestCard} />
      {isBestCard && (
        <div className="mt-pr-12 mo:mt-0">
          <p className="text-14m text-t-disabled mo:text-12m">
            {dotDate(createdAt)}
          </p>
        </div>
      )}

      <ArticleCardFooter
        isBestCard={isBestCard}
        writer={writer}
        createdAt={createdAt}
        likeCount={likeCount}
      />
    </Card>
  );
}

export default ArticleCard;

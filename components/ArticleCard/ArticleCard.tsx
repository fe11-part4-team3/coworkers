import Link from 'next/link';
import classNames from 'classnames';

import { ArticleCardProps } from '@/types/article.type';
import { dotDate } from '@/utils/dateConversion';
import BestMedal from '@/public/images/icon-medal.svg';
import ArticleCardContent from '@/components/ArticleCard/ArticleCardContent';
import ArticleCardFooter from '@/components/ArticleCard/ArticleCardFooter';

const CARD_STYLE =
  ' transition-colors hover:border-i-hover rounded-pr-12 flex flex-col border border-b-tertiary bg-b-secondary text-16sb mo:relative mo:w-full mo:px-pr-16 cursor-pointer';
const NORMAL_STYLE =
  'h-pr-176 w-pr-590 px-pr-32 py-pr-24 mo:h-pr-162 mo:pb-pr-16 ta:w-full';
const BEST_STYLE =
  'relative h-pr-220 w-pr-387 ta:w-full px-pr-24 pb-pr-16 pt-pr-48 mo:h-pr-178 mo:pt-pr-40';

/**
 * @param {'normal' | 'best'} props.type - 게시글 카드 타입 (normal type default)
 * @param {object} props.articleData - 게시글 데이터
 * @param {Function} props.handleArticleDelete - 게시글 삭제 함수
 * @returns {JSX.Element} 베스트, 일반 게시글 카드 컴포넌트
 */
function ArticleCard({
  type = 'normal',
  articleData,
  handleArticleDelete,
}: ArticleCardProps) {
  const { id, title, image, createdAt, writer, likeCount } = articleData;
  const isBestCard = type === 'best';

  return (
    <Link
      href={`/boards/${id}`}
      className={classNames(CARD_STYLE, isBestCard ? BEST_STYLE : NORMAL_STYLE)}
    >
      {isBestCard && (
        <div className="absolute top-pr-13 flex items-center">
          <BestMedal />
          <span className="ml-pr-4 text-16sb mo:text-14sb">Best</span>
        </div>
      )}

      <ArticleCardContent
        isBestCard={isBestCard}
        id={id}
        title={title}
        image={image}
        writer={writer}
        handleArticleDelete={handleArticleDelete}
      />

      {isBestCard && (
        <div className="mt-pr-12 mo:mt-0">
          <p className="text-14m text-t-disabled mo:text-12m">
            {dotDate(createdAt)}
          </p>
        </div>
      )}

      <ArticleCardFooter
        id={id}
        isBestCard={isBestCard}
        writer={writer}
        createdAt={createdAt}
        likeCount={likeCount}
        handleArticleDelete={handleArticleDelete}
      />
    </Link>
  );
}

export default ArticleCard;

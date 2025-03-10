import classNames from 'classnames';
import { useRouter } from 'next/navigation';

import { dotDate } from '@/utils/dateConversion';
import { CardFooter } from '@/components/ui/card';
import WriterProfile from '@/components/WriterProfile';
import LikeCount from '@/components/LikeCount';
import useUserStore from '@/stores/useUser.store';
import KebabDropDown from '@/components/KebabDropDown';
import { ArticleCardFooterProps } from '@/types/article.type';

/**
 * @param {number} props.id - 게시글 id
 * @param {boolean} props.isBestCard - 게시글 데이터
 * @param {object} props.writer - 게시글 작성자 id, nickname
 * @param {number} props.likeCount - 게시글 좋아요 수
 * @param {string} props.createdAt - 게시글 생성일
 * @param {Function} props.handleArticleDelete - 게시글 삭제 함수
 * @returns {JSX.Element} 게시글 카드의 프로필, 생성일, 좋아요가 포함된 Card Footer 컴포넌트
 */
function ArticleCardFooter({
  id,
  isBestCard,
  writer,
  likeCount,
  createdAt,
  handleArticleDelete,
}: ArticleCardFooterProps) {
  const { user: userData } = useUserStore();
  const router = useRouter();

  const cardFooterStyled = classNames(
    'p-0 mo:items-center',
    !isBestCard
      ? 'mt-pr-24 flex justify-between mo:mt-pr-25'
      : 'mt-auto flex-col',
  );
  const createdAtStyled = `mo:absolute mo:-top-pr-30 mo:pl-0 mo:before:content-none`;

  return (
    <CardFooter className={cardFooterStyled}>
      {!isBestCard ? (
        <>
          <div className="flex items-center mo:relative mo:flex-col-reverse mo:items-start">
            <WriterProfile writer={writer} />
            <span className="line-col mo:hidden" />
            <div className={createdAtStyled}>
              <p className="text-14m text-t-disabled mo:text-12m">
                {dotDate(createdAt)}
              </p>
            </div>
          </div>

          <div className="mo:flex mo:items-center mo:gap-pr-8">
            <LikeCount type="readOnly" likeCount={likeCount} />

            {userData?.id === writer.id && handleArticleDelete && (
              <div
                className="hidden mo:block"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
              >
                <KebabDropDown
                  onEdit={() => router.push(`/boards/editarticle/${id}`)}
                  onDelete={() => handleArticleDelete(id)}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex w-full justify-between">
          <WriterProfile writer={writer} />
          <LikeCount type="readOnly" likeCount={likeCount} />
        </div>
      )}
    </CardFooter>
  );
}

export default ArticleCardFooter;

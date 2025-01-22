import { dotDate } from '@/utils/dateConversion';
import { CardFooter } from '@/components/ui/card';
import WriterProfile from '@/components/WriterProfile';
import LikeCount from '@/components/LikeCount';
import useUserStore from '@/stores/useUser.store';

import KebabDropDown from '@/components/KebabDropDown';

/**
 * @param {boolean} props.isBestCard - 게시글 데이터
 * @param {object} props.writer - 게시글 작성자 id, nickname
 * @param {string} props.createdAt - 게시글 생성일
 * @param {number} props.likeCount - 게시글 좋아요 수
 * @returns {JSX.Element} 게시글 카드의 프로필, 생성일, 좋아요가 포함된 Card Footer 컴포넌트
 */
function ArticleCardFooter({
  isBestCard,
  writer,
  likeCount,
  createdAt,
}: {
  isBestCard: boolean;
  writer: { nickname: string; id: number };
  createdAt: string;
  likeCount: number;
}) {
  const { user: userData } = useUserStore();

  return (
    <CardFooter
      className={`${!isBestCard ? 'mt-pr-24 flex justify-between mo:mt-pr-25' : 'mt-auto flex-col'} p-0 mo:items-center`}
    >
      {!isBestCard ? (
        <>
          <div className="flex items-center mo:relative mo:flex-col-reverse mo:items-start">
            <WriterProfile writer={writer} />

            <div className="relative pl-pr-32 before:absolute before:left-pr-16 before:top-1/2 before:inline-block before:h-pr-12 before:w-pr-1 before:-translate-y-1/2 before:bg-t-disabled before:content-[''] mo:absolute mo:-top-pr-30 mo:pl-0 mo:before:content-none">
              <p className="text-14m text-t-disabled mo:text-12m">
                {dotDate(createdAt)}
              </p>
            </div>
          </div>

          <div className="mo:flex mo:items-center mo:gap-pr-8">
            <LikeCount type="readOnly" likeCount={likeCount} />

            {userData?.id === writer.id && (
              <div className="hidden mo:mt-pr-4 mo:block">
                <KebabDropDown
                  onEdit={() => alert('수정')}
                  onDelete={() => alert('삭제')}
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

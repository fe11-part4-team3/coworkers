import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconText from '@/components/IconLabel';
import KebabDropDown from '@/components/KebabDropDown';
import LikeCount from '@/components/LikeCount';
import WriterProfile from '@/components/WriterProfile';
import { dotDate } from '@/utils/dateConversion';
import { deleteArticle, getArticleDetail } from '@/service/article.api';
import { GetArticleDetailParams } from '@/types/article.type';
import useUser from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

function ArticleDetail({ articleId }: GetArticleDetailParams) {
  const { user } = useUser();
  const router = useRouter();
  const {
    data: articleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articleDetail', articleId],
    queryFn: () => getArticleDetail({ articleId }),
  });

  const isArticleData = !!articleData;

  if (isError) {
    return <p>에러가 발생했습니다.</p>;
  }

  const handleArticleDelete = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      deleteArticle({ articleId });
      router.push('/boards');
    }
  };

  return (
    <div className="mt-pr-56">
      <div className="pb-pr-27.5 pt-pr-24">
        <div className="flex justify-between">
          {isLoading || !isArticleData ? (
            <Skeleton className="h-pr-22 w-pr-330" />
          ) : (
            <p className="text-18m">{articleData.title}</p>
          )}

          {user?.id === articleData?.writer?.id && (
            <div className="ml-pr-16 shrink">
              <KebabDropDown
                onEdit={() => alert('수정하기')}
                onDelete={handleArticleDelete}
              />
            </div>
          )}
        </div>

        <div className="mt-pr-16 flex justify-between border border-x-0 border-b-0 pt-pr-16">
          <div className="flex items-center">
            {isLoading || !isArticleData ? (
              <div className="flex items-center">
                <Skeleton className="size-pr-32 rounded-full" />
                <div className="ml-pr-12">
                  <Skeleton className="h-pr-17 w-pr-50" />
                </div>
              </div>
            ) : (
              <WriterProfile writer={articleData.writer} />
            )}

            <span className="mx-pr-16 h-pr-12 w-pr-1 bg-b-tertiary" />

            {isLoading || !isArticleData ? (
              <Skeleton className="h-pr-17 w-pr-70" />
            ) : (
              <span className="text-14m text-t-disabled">
                {dotDate(articleData.createdAt)}
                {articleData.createdAt !== articleData.updatedAt && ' (수정됨)'}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div className="mr-pr-16">
              {isLoading || !isArticleData ? (
                <Skeleton className="h-pr-16 w-pr-36" />
              ) : (
                <IconText
                  text={articleData.commentCount}
                  type="commentCount"
                  fontSize="M"
                  fontColor="text-t-disabled"
                />
              )}
            </div>

            {isLoading || !isArticleData ? (
              <Skeleton className="h-pr-16 w-pr-36" />
            ) : (
              <LikeCount
                type="interactive"
                likeCount={articleData.likeCount}
                isLiked={articleData.isLiked}
                articleId={articleId}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        {articleData?.image && (
          <div className="relative mt-pr-24 h-pr-500 w-full">
            <Image
              src={articleData.image}
              alt="게시글 이미지"
              fill
              className="object-contain"
            />
          </div>
        )}

        {isLoading || !isArticleData ? (
          <Skeleton className="mb-pr-80 mt-pr-24 h-pr-24 w-pr-180" />
        ) : (
          <p className="mb-pr-80 mt-pr-24">{articleData.content}</p>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;

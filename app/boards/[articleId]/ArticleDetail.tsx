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
import { useSnackbar } from '@/contexts/SnackBar.context';
import useModalStore from '@/stores/modalStore';
import EditDelete from '@/components/modal/EditDelete';

import ArticleDetailSkeleton from './ArticleDetailSkeleton';

function ArticleDetail({ articleId }: GetArticleDetailParams) {
  const { user } = useUser();
  const router = useRouter();
  const {
    data: articleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articleDetail', articleId],
    queryFn: () => getArticleDetail({ articleId: articleId }),
  });

  const { showSnackbar } = useSnackbar();

  const { openModal } = useModalStore();

  if (isError) return '에러가 발생했습니다.';
  if (!articleData || isLoading) return <ArticleDetailSkeleton />;

  const {
    title,
    content,
    image,
    createdAt,
    updatedAt,
    commentCount,
    likeCount,
    isLiked,
    writer,
  } = articleData;

  const handleArticleDelete = () => {
    openModal(
      <EditDelete
        title="게시글"
        actionType="삭제"
        onClick={() => {
          deleteArticle({ articleId });
          showSnackbar('게시글이 삭제되었습니다.');
          router.push('/boards');
        }}
      />,
    );
  };

  return (
    <div className="mt-pr-56 mo:mt-pr-40">
      <div className="pb-pr-27.5 pt-pr-24">
        <div className="flex justify-between">
          <p className="text-18m">{title}</p>
          {user?.id === writer.id && (
            <div className="ml-pr-16 shrink">
              <KebabDropDown
                onEdit={() => router.push(`/boards/editarticle/${articleId}`)}
                onDelete={handleArticleDelete}
              />
            </div>
          )}
        </div>

        <div className="mt-pr-16 flex justify-between border border-x-0 border-b-0 pt-pr-16">
          <div className="flex items-center">
            <WriterProfile writer={writer} />
            <span className="mx-pr-16 h-pr-12 w-pr-1 bg-b-tertiary" />

            <span className="text-14m text-t-disabled">
              {dotDate(createdAt)}
              {createdAt !== updatedAt && ' (수정됨)'}
            </span>
          </div>

          <div className="flex items-center">
            <div className="mr-pr-16">
              <IconText
                text={commentCount}
                type="commentCount"
                fontSize="M"
                fontColor="text-t-disabled"
              />
            </div>

            <LikeCount
              type="interactive"
              likeCount={likeCount}
              isLiked={isLiked}
              articleId={articleId}
            />
          </div>
        </div>
      </div>

      <div>
        {image && (
          <div className="relative mt-pr-34 h-pr-500 w-full mo:mt-pr-24 mo:h-pr-200 ta:h-pr-300">
            <Image
              src={image}
              alt="게시글 이미지"
              fill
              className="object-contain"
            />
          </div>
        )}

        <p className="mb-pr-80 mt-pr-24">{content}</p>
      </div>
    </div>
  );
}

export default ArticleDetail;

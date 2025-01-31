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

function ArticleDetail({ articleId }: GetArticleDetailParams) {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['articleDetail'],
    queryFn: () => getArticleDetail({ articleId: articleId }),
  });

  if (!data) return;

  const {
    title,
    content,
    image,
    createdAt,
    updatedAt,
    commentCount,
    likeCount,
    writer,
  } = data;

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
          <p className="text-18m">{title}</p>
          <div className="ml-pr-16 shrink">
            <KebabDropDown
              onEdit={() => alert('수정하기')}
              onDelete={handleArticleDelete}
            />
          </div>
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

            <LikeCount type="interactive" likeCount={likeCount} />
          </div>
        </div>
      </div>

      <div>
        {image && (
          <div className="relative mt-pr-24 h-pr-500 w-full">
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

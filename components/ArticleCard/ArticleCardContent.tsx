import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import KebabDropDown from '@/components/KebabDropDown';

/**
 * @param {boolean} props.isBestCard - 게시글 데이터
 * @param {string} props.title - 게시글 제목
 * @param {string | null} props.image - 게시글 이미지
 * @returns {JSX.Element} 게시글 카드의 제목, 이미지가 포함된 Card Content 컴포넌트
 */
function ArticleCardContent({
  isBestCard,
  title,
  image,
}: {
  title: string;
  image: string | null;
  isBestCard: boolean;
}) {
  return (
    <CardContent
      className={`${isBestCard ? 'max-h-pr-72' : 'h-pr-72 mo:max-h-pr-64'} flex justify-between p-0`}
    >
      <p className="line-clamp-2 max-h-pr-56 text-18m leading-7 text-t-secondary mo:mb-pr-12 mo:max-h-pr-48 mo:text-14 mo:leading-6">
        {title}
      </p>
      <div className="ml-auto flex">
        {image !== null && (
          <div className="relative ml-pr-16 size-pr-72 shrink-0 overflow-hidden rounded-lg border mo:size-pr-64">
            <Image
              src={image}
              alt="게시글 이미지"
              className="object-cover"
              fill
            />
          </div>
        )}
        {!isBestCard && (
          <div className="ml-pr-16 mo:absolute mo:bottom-pr-18 mo:right-pr-16 mo:ml-0">
            <KebabDropDown
              onEdit={() => alert('수정')}
              onDelete={() => alert('삭제')}
            />
          </div>
        )}
      </div>
    </CardContent>
  );
}

export default ArticleCardContent;

import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import KebabDropDown from '@/components/KebabDropDown';
import useUserStore from '@/stores/useUser.store';
import classNames from 'classnames';

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
  writer,
}: {
  title: string;
  image: string | null;
  isBestCard: boolean;
  writer: {
    id: number;
  };
}) {
  const { user: userData } = useUserStore();

  const cardContentStyled = classNames(
    'flex justify-between p-0',
    isBestCard ? 'max-h-pr-72' : 'h-pr-72 mo:max-h-pr-64',
  );
  const imageStyled =
    'border-b-tertiary relative ml-pr-16 size-pr-72 shrink-0 overflow-hidden rounded-lg mo:size-pr-64';

  return (
    <CardContent className={cardContentStyled}>
      <p className="article_title line-clamp-2 max-h-pr-56 mo:mb-pr-12 mo:max-h-pr-48">
        {title}
      </p>
      <div className="ml-auto flex">
        {image !== null && (
          <div className={imageStyled}>
            <Image
              src={image}
              alt="게시글 이미지"
              className="object-cover"
              fill
            />
          </div>
        )}
        {!isBestCard && userData?.id === writer.id && (
          <div className="ml-pr-16 mo:hidden">
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

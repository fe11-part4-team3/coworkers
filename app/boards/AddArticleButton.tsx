import { useRouter } from 'next/navigation';

import Buttons from '@/components/Buttons';
import ICON_PLUS from '@/public/images/icon-plus.svg';

/**
 * @returns {JSX.Element} 글쓰기 버튼 컴포넌트
 */
function AddArticleButton() {
  const router = useRouter();

  return (
    <div className="sticky bottom-pr-90 right-0 h-0 text-right">
      <div className="inline-block">
        <Buttons
          text="글쓰기"
          icon={<ICON_PLUS width={16} height={16} strokeWidth={2} />}
          onClick={() => router.push('/boards/addarticle')}
          size="XL"
          rounded={true}
          className="w-pr-104"
        />
      </div>
    </div>
  );
}

export default AddArticleButton;

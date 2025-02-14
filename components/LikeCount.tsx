import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ICON_HEART from '@/public/images/icon-heart.svg';
import { likeArticle, unlikeArticle } from '@/service/article.api';

interface LikeCountProps {
  type: 'readOnly' | 'interactive';
  likeCount: number;
  isLiked?: boolean;
  articleId?: number;
}

/**
 * @param {'readOnly' | 'interactive'} type - 컴포넌트 타입
 *  readOnly : 좋아요 수 확인만 가능, 클릭 시 아무 동작 없음
 *  interactive : 클릭 시 좋아요 수 카운트되며 하트 버튼 토글
 * @param {number} likeCount - 초기 좋아요 수
 * @returns {JSX.Element} 좋아요 수와 좋아요 버튼을 렌더링하는 컴포넌트
 */
function LikeCount({ type, likeCount, isLiked, articleId }: LikeCountProps) {
  const queryClient = useQueryClient();
  const [isCheck, setIsCheck] = useState(isLiked);
  const [currentCount, setCurrentCount] = useState(likeCount);

  useEffect(() => {
    setIsCheck(isLiked);
    setCurrentCount(likeCount);
  }, [isLiked, likeCount]);

  const mutation = useMutation({
    mutationFn: async (likeState: boolean) => {
      if (!articleId) return;
      return likeState
        ? await likeArticle({ articleId })
        : await unlikeArticle({ articleId });
    },

    onMutate: async (likeState: boolean) => {
      const prevLikeState = queryClient.getQueryData([
        'articleDetail',
        articleId,
      ]);

      // UI 먼저 변경 (낙관적 업데이트)
      setIsCheck(likeState);
      setCurrentCount(likeState ? currentCount + 1 : currentCount - 1);

      return { prevLikeState };
    },

    onError: (context: { prevLikeState?: unknown }) => {
      if (context?.prevLikeState) {
        queryClient.setQueryData(
          ['articleDetail', articleId],
          context.prevLikeState,
        );
      }

      // 실패 시 원래 상태로 롤백
      setIsCheck(isLiked);
      setCurrentCount(likeCount);
    },

    onSettled: () => {
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['articleDetail', articleId] });
    },
  });

  return (
    <button
      className="flex items-center justify-center text-14 text-t-disabled mo:text-12"
      onClick={() => mutation.mutate(!isCheck)}
      disabled={type === 'readOnly'}
    >
      <ICON_HEART
        fill={!isCheck ? 'none' : 'var(--s-danger)'}
        stroke={!isCheck ? 'var(--icon-primary)' : 'none'}
      />
      <span className="ml-pr-5">
        {currentCount >= 9999 ? '9999+' : currentCount}
      </span>
    </button>
  );
}

export default LikeCount;

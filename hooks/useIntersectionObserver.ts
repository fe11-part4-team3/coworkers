import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getArticleCommentList } from '@/service/articleComment.api';

interface IntersectionObserver {
  queryKey: string;
  articleId: number;
  limit: number;
}

/**
 * @param {string} props.queryKey - queryKey 이름
 * @param {Function} props.articleId - 개시글 Id
 * @param {Function} props.limit - 불러올 데이터의 수
 * @returns {JSX.Element} - 무한스크롤 커스텀 훅
 *
 * @example
 * const { ref, data, isLoading, isError } = useIntersectionObserver({
    queryKey: 'commentList',
    articleId: articleId,
    limit: 6,
  });
 */
export const useIntersectionObserver = ({
  queryKey,
  articleId,
  limit,
}: IntersectionObserver) => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage, // 다음 페이지 데이터를 가져오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [queryKey, articleId],
    queryFn: ({ pageParam = null }: { pageParam: number | null }) =>
      getArticleCommentList({ articleId, limit: limit, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // 다음 페이지의 커서 반환
  });

  useEffect(() => {
    // 센서가 감지되고, 다음 페이지가 있다면 데이터 요청
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return { ref, data, isLoading, isError };
};

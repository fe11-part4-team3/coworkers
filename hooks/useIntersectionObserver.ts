import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface ApiFunction<P, R> {
  (params: P): Promise<R>;
}

interface IntersectionObserverProps<P, R> {
  queryKey: string;
  api: ApiFunction<P, R>;
  apiParams: P;
  getNextPageParam: (lastPage: R) => unknown;
}

/**
 * @param {string} queryKey - React Query의 queryKey
 * @param {Function} api - 데이터를 불러오는 API 함수
 * @param {Object} apiParams - API에 전달할 기본 매개변수
 * @param {Function} getNextPageParam - 다음 페이지 파라미터를 결정하는 함수
 * @returns {JSX.Element} - 무한스크롤 커스텀 훅
 *
 * @example
 * const { ref, data, isLoading, isError } = useIntersectionObserver({
 *   queryKey: 'comments',
 *   api: getArticleCommentList,
 *   apiParams: { postId: 1, limit: 10 },
 *   getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
 * });
 */
export const useIntersectionObserver = <P, R>({
  queryKey,
  api,
  apiParams,
  getNextPageParam,
}: IntersectionObserverProps<P, R>) => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [queryKey, apiParams],
    queryFn: ({ pageParam = null }: { pageParam?: unknown }) => {
      const paramsWithCursor = { ...apiParams, cursor: pageParam };
      return api(paramsWithCursor);
    },
    initialPageParam: null,
    getNextPageParam,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  return { ref, data, isLoading, isError };
};

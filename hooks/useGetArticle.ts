import { useQuery } from '@tanstack/react-query';

import { getArticleList } from '@/service/article.api';

interface GetArticleProps {
  queryKey: string;
  pageSize: number;
  page?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
}

const useGetArticle = ({
  queryKey,
  pageSize,
  page,
  orderBy = 'recent',
  keyword = '',
  deviceType,
}: GetArticleProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [{ queryKey }, page, orderBy, deviceType, keyword],
    queryFn: () =>
      getArticleList({
        pageSize: pageSize,
        page: page,
        orderBy: orderBy,
        keyword: keyword,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetArticle;

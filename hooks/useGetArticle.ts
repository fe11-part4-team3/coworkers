import { getArticleList } from '@/service/article.api';
import { useQuery } from '@tanstack/react-query';

interface GetArticleProps {
  queryKey: string;
  pageSize: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
}

const useGetArticle = ({
  queryKey,
  pageSize,
  orderBy = 'recent',
  keyword = '',
  deviceType,
}: GetArticleProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [{ queryKey }, orderBy, deviceType, keyword],
    queryFn: () =>
      getArticleList({
        pageSize: pageSize,
        orderBy: orderBy,
        keyword: keyword,
      }),
  });

  return { data, isLoading, isError };
};

export default useGetArticle;

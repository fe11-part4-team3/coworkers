'use client';

import { useState, useEffect, useCallback } from 'react';

import ArticleCard from '@/components/ArticleCard/ArticleCard';
import SelectBox from '@/components/SelectBox';
import useGetArticle from '@/hooks/useGetArticle';
import { IArticle } from '@/types/article.type';

import ArticleSkeleton from './ArticleSkeleton';
import EmptyList from './EmptyList';

/**
 * @param {string | undefined} props.keyword - 입력 검색어
 * @returns {JSX.Element} 일반 게시글 리스트 컴포넌트
 */
function ArticleList({ keyword }: { keyword: string | undefined }) {
  const [option, setOption] = useState<'recent' | 'like'>('recent');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부

  const {
    data: articleList,
    isLoading,
    isError,
  } = useGetArticle({
    queryKey: 'bestArticleList',
    pageSize: 10,
    orderBy: option,
    keyword: keyword ?? '',
    page,
  });

  useEffect(() => {
    if (articleList?.list) {
      setArticles((prevArticles) => [...prevArticles, ...articleList.list]);

      // 불러온 데이터 수가 totalCount에 도달하면 더 이상 로드하지 않음
      if (articles.length + articleList.list.length >= articleList.totalCount) {
        setHasMore(false);
      }
    }
  }, [articleList]);

  const handleScroll = useCallback(() => {
    if (
      !hasMore ||
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return; // 더 불러올 데이터가 없으면 리턴
    }
    setPage((prevPage) => prevPage + 1);
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // 옵션 변경 시 페이지 및 리스트 초기화
    setPage(1);
    setArticles([]);
    setHasMore(true); // 옵션이 변경되면 데이터 다시 로드 가능하도록 초기화
  }, [option, keyword]);

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      {articles.length > 0 ? (
        <section className="mt-pr-40">
          <div className="flex justify-between">
            <h3 className="text-20b">게시글</h3>
            <SelectBox
              onValueChange={(value: string) =>
                setOption(value as 'recent' | 'like')
              }
              options={[
                { label: '최신순', value: 'recent' },
                { label: '좋아요순', value: 'like' },
              ]}
              width="w-pr-120 mo:w-pr-94"
              defaultValue="recent"
            />
          </div>
          <div className="mt-pr-32 flex flex-wrap justify-between gap-y-pr-24">
            {articles.map((article) => (
              <ArticleCard key={article.id} articleData={article} />
            ))}
            {isLoading && <ArticleSkeleton count={4} />}
          </div>
        </section>
      ) : (
        !isLoading && <EmptyList />
      )}
    </>
  );
}

export default ArticleList;

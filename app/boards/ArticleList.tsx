'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ArticleCard from '@/components/ArticleCard/ArticleCard';
import SelectBox from '@/components/SelectBox';
import useGetArticle from '@/hooks/useGetArticle';
import { deleteArticle } from '@/service/article.api';

import ArticleSkeleton from './ArticleSkeleton';
import EmptyList from './EmptyList';

/**
 * @param {string | undefined} props.keyword - 입력 검색어
 * @returns {JSX.Element} 일반 게시글 리스트 컴포넌트
 */
function ArticleList({ keyword }: { keyword: string | undefined }) {
  const [option, setOption] = useState<'recent' | 'like'>('recent');
  const queryClient = useQueryClient();

  const {
    data: articleList,
    isLoading,
    isError,
  } = useGetArticle({
    queryKey: 'articleList',
    pageSize: 100,
    orderBy: option,
    keyword: keyword ?? '',
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: number) => {
      if (confirm('게시글을 삭제하시겠습니까?')) {
        await deleteArticle({ articleId: id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articleList'] });
    },
  });

  if (isError) return '에러가 발생했습니다.';

  return (
    <>
      {!(articleList?.list.length === 0) ? (
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
            {!isLoading ? (
              articleList?.list.map((article) => (
                <ArticleCard
                  key={article.id}
                  articleData={article}
                  handleArticleDelete={() =>
                    deleteArticleMutation.mutate(article.id)
                  }
                />
              ))
            ) : (
              <ArticleSkeleton count={4} />
            )}
          </div>
        </section>
      ) : (
        <EmptyList />
      )}
    </>
  );
}

export default ArticleList;

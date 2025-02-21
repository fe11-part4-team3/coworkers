'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import ArticleCard from '@/components/ArticleCard/ArticleCard';
import SelectBox from '@/components/SelectBox';
import useGetArticle from '@/hooks/useGetArticle';
import { deleteArticle } from '@/service/article.api';
import Empty from '@/components/Empty/Empty';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useModalStore from '@/stores/modalStore';
import EditDelete from '@/components/modal/EditDelete';

import ArticleSkeleton from './ArticleSkeleton';

/**
 * @param {string | undefined} props.keyword - 입력 검색어
 * @returns {JSX.Element} 일반 게시글 리스트 컴포넌트
 */
function ArticleList({ keyword }: { keyword: string | undefined }) {
  const [option, setOption] = useState<'recent' | 'like'>('recent');
  const queryClient = useQueryClient();

  const { showSnackbar } = useSnackbar();

  const { openModal } = useModalStore();

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
      await deleteArticle({ articleId: id });
      showSnackbar('게시글이 삭제되었습니다.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articleList'] });
    },
    onError: () => {
      showSnackbar('게시글 삭제를 실패했습니다. 다시 시도해주세요', 'error');
    },
  });

  const handleArticleDelete = (id: number) => {
    openModal(
      <EditDelete
        title="게시글"
        actionType="삭제"
        onClick={() => deleteArticleMutation.mutate(id)}
      />,
    );
  };

  if (isError) return '에러가 발생했습니다.';

  if (articleList?.list.length === 0) {
    return (
      <Empty className="mt-pr-180">
        <Empty.TextWrapper>
          <Empty.Text text="조회된 게시글이 없습니다." />
        </Empty.TextWrapper>
        <Empty.ButtonWrapper>
          <Empty.Buttons text="게시글 작성하기" href="/boards/addarticle" />
        </Empty.ButtonWrapper>
      </Empty>
    );
  }

  return (
    <section className="mt-pr-40 mo:mt-pr-32">
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
      <div className="mt-pr-32 flex flex-wrap justify-between gap-y-pr-24 mo:mt-pr-24 mo:gap-pr-16">
        {!isLoading ? (
          articleList?.list.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="tamo:w-full"
            >
              <ArticleCard
                articleData={article}
                handleArticleDelete={() => {
                  handleArticleDelete(article.id);
                }}
              />
            </motion.div>
          ))
        ) : (
          <ArticleSkeleton count={12} />
        )}
      </div>
    </section>
  );
}

export default ArticleList;

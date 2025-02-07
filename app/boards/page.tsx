'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import Container from '@/components/layout/Container';

import AddArticleButton from './AddArticleButton';
import BestArticleList from './BestArticleList';
import ArticleList from './ArticleList';
import ArticleSearch from './ArticleSearch';

/**
 * @returns {JSX.Element} 자유게시판 페이지
 */
export default function BoardsPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? undefined;

  return (
    <Container className="relative pb-pr-40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
      >
        <ArticleSearch />

        {!keyword && <BestArticleList />}

        <ArticleList keyword={keyword} />
        {!keyword && <AddArticleButton />}
      </motion.div>
    </Container>
  );
}

'use client';

import { useParams } from 'next/navigation';

import Container from '@/components/layout/Container';

function ArticleDetailPage() {
  const { articleId } = useParams();

  return <Container>{articleId}번 게시글 상세 페이지</Container>;
}

export default ArticleDetailPage;

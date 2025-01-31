'use client';

import { useParams } from 'next/navigation';

import Container from '@/components/layout/Container';

import ArticleDetail from './ArticleDtail';
import CommentContainer from './CommentContainer';

function ArticleDetailPage() {
  const { articleId } = useParams();

  return (
    <Container>
      <ArticleDetail articleId={Number(articleId)} />
      <CommentContainer articleId={Number(articleId)} />
    </Container>
  );
}

export default ArticleDetailPage;

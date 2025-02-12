'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import Container from '@/components/layout/Container';

import ArticleDetail from './ArticleDetail';
import CommentContainer from './CommentContainer';

function ArticleDetailPage() {
  const params = useParams();
  const safeParams = React.useMemo(() => params, [params]);
  const { articleId } = safeParams;

  return (
    <Container>
      <ArticleDetail articleId={Number(articleId)} />
      <CommentContainer articleId={Number(articleId)} />
    </Container>
  );
}

export default ArticleDetailPage;

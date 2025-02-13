'use client';

import React from 'react';

import Container from '@/components/layout/Container';
import useSafeParams from '@/hooks/useSafeParams';

import ArticleDetail from './ArticleDetail';
import CommentContainer from './CommentContainer';

function ArticleDetailPage() {
  const { articleId } = useSafeParams();

  return (
    <Container>
      <ArticleDetail articleId={Number(articleId)} />
      <CommentContainer articleId={Number(articleId)} />
    </Container>
  );
}

export default ArticleDetailPage;

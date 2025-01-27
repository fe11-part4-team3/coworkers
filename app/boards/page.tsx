'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Container from '@/components/layout/Container';

import AddArticleButton from './AddArticleButton';
import BestArticleList from './BestArticleList';
import ArticleList from './ArticleList';
import ArticleSearch from './ArticleSearch';

/**
 * @returns {JSX.Element} 자유게시판 페이지
 */
export default function BoardsPage() {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? undefined;

  const router = useRouter();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search) {
      router.push(`/boards?q=${search}`);
    } else if (search === '') {
      router.push('/boards');
    }
  };

  return (
    <Container className="relative pb-pr-40">
      <ArticleSearch
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
      <BestArticleList keyword={keyword} />
      <ArticleList keyword={keyword} />
      <AddArticleButton />
    </Container>
  );
}

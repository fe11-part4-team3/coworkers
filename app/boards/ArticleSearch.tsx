import { ChangeEvent, FormEvent } from 'react';

import SearchInput from '@/components/SearchInput/SearchInput';

/**
 * @param {string} props.search - 현재 검색어 상태
 * @param {function} props.handleSearchInputChange - 검색 입력값 변경 핸들러
 * @param {function} props.handleSearchFormSubmit - 검색 폼 제출 핸들러
 * @returns {JSX.Element} 검색 입력 컴포넌트
 */
function ArticleSearch({
  search,
  handleSearchFormSubmit,
  handleSearchInputChange,
}: {
  search: string;
  handleSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="mt-pr-40">
      <h2 className="mb-pr-40 text-24b">자유게시판</h2>
      <form onSubmit={handleSearchFormSubmit}>
        <SearchInput value={search} onChange={handleSearchInputChange} />
      </form>
    </section>
  );
}

export default ArticleSearch;

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import SearchInput from '@/components/SearchInput/SearchInput';

/**
 * @param {string} props.search - 현재 검색어 상태
 * @param {function} props.handleSearchInputChange - 검색 입력값 변경 핸들러
 * @param {function} props.handleSearchFormSubmit - 검색 폼 제출 핸들러
 * @returns {JSX.Element} 검색 입력 컴포넌트
 */
function ArticleSearch() {
  const [search, setSearch] = useState('');
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
    <section className="mt-pr-40">
      <h2 className="mb-pr-40 text-24b mo:mb-pr-24">자유게시판</h2>
      <form onSubmit={handleSearchFormSubmit}>
        <SearchInput value={search} onChange={handleSearchInputChange} />
      </form>
    </section>
  );
}

export default ArticleSearch;

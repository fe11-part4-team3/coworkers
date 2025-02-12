import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import SearchInput from '@/components/SearchInput/SearchInput';
import useForm from '@/hooks/useForm';

/**
 * @returns {JSX.Element} 검색 입력 컴포넌트
 */
function ArticleSearch() {
  const router = useRouter();

  const { formData, handleInputChange } = useForm({
    keyword: '',
  });

  const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.keyword) {
      router.push(`/boards?q=${formData.keyword}`);
    } else if (formData.keyword === '') {
      router.push('/boards');
    }
  };

  return (
    <section className="mt-pr-40">
      <h2 className="mb-pr-40 text-24b mo:mb-pr-24">자유게시판</h2>
      <form onSubmit={handleSearchFormSubmit}>
        <SearchInput value={formData.keyword} onChange={handleInputChange} />
      </form>
    </section>
  );
}

export default ArticleSearch;

import { ChangeEvent } from 'react';

import { inputStyled } from '@/components/InputField/InputField';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @param {string} props.value - 검색 입력 현재 값.
 * @param {Function} props.onChange - 검색어 입력 시 호출되는 함수.
 * @returns {JSX.Element} 자유게시판 검색 입력 컴포넌트
 */
function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <button
        type="submit"
        className="absolute left-pr-16 top-1/2 size-pr-24 -translate-y-1/2 bg-[url('/images/icon-search.svg')] content-['']"
      />
      <Input
        type="text"
        className={`${inputStyled} h-pr-56 pl-pr-52 pr-pr-16 hover:border-i-hover mo:h-pr-48`}
        placeholder="검색어를 입력해주세요"
        name="keyword"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;

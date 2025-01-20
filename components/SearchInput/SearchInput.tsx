import { ChangeEvent } from 'react';

import { inputStyled } from '../InputField/InputField';
import { Input } from '../ui/input';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

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

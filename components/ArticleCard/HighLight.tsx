import { useSearchParams } from 'next/navigation';

/**
 * @param {string} props.title - 게시글 제목
 * @returns {JSX.Element} 자유게시판 검색어 입력 시 제목에 키워드 마킹
 */
function Highlight({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? undefined;

  if (!keyword) return <>{title}</>;

  const regex = new RegExp(`(${keyword})`, 'g');
  const parts = title.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part === keyword ? (
          <span key={i} className="bg-brand-primary px-pr-3">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default Highlight;

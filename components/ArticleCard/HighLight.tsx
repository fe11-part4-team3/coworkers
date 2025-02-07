import { useSearchParams } from 'next/navigation';

function Highlight({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? undefined;

  if (!keyword) return <>{title}</>;

  const regex = new RegExp(`(${keyword})`, 'gi');
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

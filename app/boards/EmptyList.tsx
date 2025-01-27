import Image from 'next/image';

/**
 * @returns {JSX.Element} 검색 내용이 없는 경우
 */
function EmptyList() {
  return (
    <div className="mx-auto mt-pr-180 w-pr-810">
      <div className="relative h-pr-255">
        <Image src="/images/img-noTeam.png" alt="" fill />
      </div>
      <p className="mt-pr-48 text-center text-16m text-t-default">
        조회된 게시글이 없습니다.
      </p>
    </div>
  );
}

export default EmptyList;

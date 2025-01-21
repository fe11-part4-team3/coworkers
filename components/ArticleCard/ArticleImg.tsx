import Image from 'next/image';

function ArticleImg({ src }: { src: string }) {
  return (
    <div className="relative ml-pr-16 size-pr-72 shrink-0 overflow-hidden rounded-lg">
      <Image src={src} alt="게시글 이미지" fill />
    </div>
  );
}

export default ArticleImg;

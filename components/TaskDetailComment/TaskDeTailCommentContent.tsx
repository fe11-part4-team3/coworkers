/**
 * @param {string} props.content - 댓글 내용
 * @returns {JSX.Element} - 댓글 내용 컴포넌트
 */
function CommentContent({ content }: { content: string }) {
  return <p className="break-all text-14 text-t-primary">{content}</p>;
}

export default CommentContent;

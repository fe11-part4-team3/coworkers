import useUserStore from '@/stores/useUser.store';
import { CardContent } from '@/components/ui/card';
import DropDown from '@/components/DropDown';

/**
 * @param {string} props.commentEditContent - 댓글 내용
 * @param {object} props.user - 댓글 작성자 유저 id (작성자 본인인지 판별)
 * @param {Function} props.handleEditClick - 댓글 수정 함수
 * @param {Function} props.handleDeleteClick - 댓글 삭제 함수
 * @returns {JSX.Element} 할 일 상세 댓글 컴포넌트
 */
function TaskDetailContent({
  commentEditContent,
  user,
  handleEditClick,
  handleDeleteClick,
}: {
  commentEditContent: string;
  user: {
    id: number;
  };
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}) {
  const { user: userData } = useUserStore();

  return (
    <CardContent className="flex min-h-pr-16 justify-between p-0">
      <p className="break-all text-14 text-t-primary">{commentEditContent}</p>

      {/* 작성자만 DropDown(수정, 삭제) 노출 */}
      {userData?.id === user.id && (
        <DropDown
          trigger={<button className="icon-kebab" />}
          items={[
            { text: '수정하기', onClick: handleEditClick },
            { text: '삭제하기', onClick: handleDeleteClick },
          ]}
          width="w-pr-120"
        />
      )}
    </CardContent>
  );
}

export default TaskDetailContent;

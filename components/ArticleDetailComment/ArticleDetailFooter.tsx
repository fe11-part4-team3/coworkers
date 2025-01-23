import Buttons from '@/components/Buttons';
import DateDisplay from '@/components/DateDisplay';
import Profile from '@/components/Profile/Profile';
import { CardFooter } from '@/components/ui/card';
import { IUserProfile } from '@/types/user.type';

/**
 * @param {object} props.writer - 댓글 작성자 유저 닉네임, 프로필 이미지
 * @param {boolean} props.commentEdit - 수정 모드 유무
 * @param {string} props.createdAt - 댓글 생성일
 * @param {string} props.commentEditContent - 수정된 댓글 내용 (기존 입력 값과 비교)
 * @param {string} props.content - 댓글 내용 (수정 입력 값과 비교)
 * @param {Function} props.cancelEditing - 댓글 수정 취소 함수
 * @param {Function} props.saveChanges - 댓글 수정 완료 함수
 * @returns {JSX.Element} 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 */
function ArticleDetailFooter({
  writer,
  commentEdit,
  createdAt,
  commentEditContent,
  content,
  cancelEditing,
  saveChanges,
}: {
  writer: IUserProfile;
  commentEdit: boolean;
  createdAt: string;
  commentEditContent: string;
  content: string;
  cancelEditing: () => void;
  saveChanges: () => void;
}) {
  return (
    <CardFooter className="mt-pr-32 flex justify-between p-0">
      <div className="flex items-center">
        <div className="flex items-center">
          <Profile variant="member" profileSize={32} />
          <span className="ml-pr-12 text-14m">{writer.nickname}</span>
        </div>

        <div className="text--t-disabled relative pl-pr-32 leading-none before:absolute before:left-pr-16 before:top-1/2 before:h-pr-12 before:w-pr-1 before:-translate-y-1/2 before:bg-t-disabled before:content-['']">
          <DateDisplay createdAt={createdAt} className="text-t-disabled" />
        </div>
      </div>

      <div className="flex gap-pr-8">
        {commentEdit && (
          <>
            <button
              className="w-pr-48 text-14sb text-t-default"
              onClick={cancelEditing}
            >
              취소
            </button>
            <Buttons
              disabled={commentEditContent === content}
              text="수정하기"
              variant="outline"
              onClick={saveChanges}
              bg="none"
              size="S"
              width="w-pr-74"
            />
          </>
        )}
      </div>
    </CardFooter>
  );
}

export default ArticleDetailFooter;

import { IUserProfile } from '@/types/user.type';

import DateDisplay from '../DateDisplay';
import { CardFooter } from '../ui/card';
import Buttons from '../Buttons';
import Profile from '../Profile/Profile';

function TaskDetailFooter({
  user,
  commentEdit,
  createdAt,
  commentEditContent,
  content,
  cancelEditing,
  saveChanges,
}: {
  user: IUserProfile;
  commentEdit: boolean;
  createdAt: string;
  commentEditContent: string;
  content: string;
  cancelEditing: () => void;
  saveChanges: () => void;
}) {
  const { nickname, image } = user;

  return (
    <CardFooter className="mt-pr-16 flex justify-between p-0">
      <div className="flex items-center">
        <Profile variant="member" profileSize={32} defaultProfile={image} />
        <span className="ml-pr-12 text-14m">{nickname}</span>
      </div>

      {!commentEdit ? (
        <DateDisplay createdAt={createdAt} />
      ) : (
        <div className="flex gap-pr-8">
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
        </div>
      )}
    </CardFooter>
  );
}

export default TaskDetailFooter;

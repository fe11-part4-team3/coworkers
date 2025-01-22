import useUserStore from '@/stores/useUser.store';

import { CardContent } from '../ui/card';
import DropDown from '../DropDown';

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

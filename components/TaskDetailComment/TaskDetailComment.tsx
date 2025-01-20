import { TaskDetailCommentProps } from '@/types/TaskDetailComment.type';
import { Card, CardContent, CardFooter } from '../ui/card';
import Profile from './Profile';
import DateDisplay from './DateDisplay';
import KebabButton from '../TaskCard/KebabButton';
import CommentContent from './CommentContent';

function TaskDetailComment({ commentData }: TaskDetailCommentProps) {
  const { id, content, createdAt, taskId, user } = commentData;

  return (
    <Card className="rounded-none border-l-0 border-r-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none">
      <CardContent className="flex justify-between p-0">
        <CommentContent content={content} />
        <KebabButton />
      </CardContent>

      <CardFooter className="mt-pr-16 flex justify-between p-0">
        <Profile user={user} />
        <DateDisplay createdAt={createdAt} />
      </CardFooter>
    </Card>
  );
}

export default TaskDetailComment;

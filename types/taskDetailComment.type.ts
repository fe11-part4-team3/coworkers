type TaskDetailCommentProps = {
  commentData: {
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      nickname: string;
      image: string | null;
    };
  };
};

export type { TaskDetailCommentProps };

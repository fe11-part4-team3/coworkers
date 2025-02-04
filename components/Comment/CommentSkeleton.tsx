import { Skeleton } from '../ui/skeleton';

function CommentProfileSkeleton() {
  return (
    <>
      <Skeleton className="size-pr-32 rounded-full" />
      <div className="ml-pr-12">
        <Skeleton className="h-pr-17 w-pr-50" />
      </div>
    </>
  );
}

function CommentDateSkeleton() {
  return <Skeleton className="h-pr-17 w-pr-60" />;
}

export { CommentProfileSkeleton, CommentDateSkeleton };

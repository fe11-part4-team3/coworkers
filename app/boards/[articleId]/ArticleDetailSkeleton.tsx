import { Skeleton } from '@/components/ui/skeleton';

function ArticleDetailSkeleton() {
  return (
    <div className="mt-pr-56">
      <div className="pb-pr-27.5 pt-pr-24">
        <div className="flex justify-between">
          <Skeleton className="h-pr-24 w-pr-330" />
        </div>

        <div className="mt-pr-16 flex justify-between border border-x-0 border-b-0 pt-pr-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Skeleton className="size-pr-32 rounded-full" />
              <div className="ml-pr-12">
                <Skeleton className="h-pr-17 w-pr-50" />
              </div>
            </div>
            <span className="mx-pr-16 h-pr-12 w-pr-1 bg-b-tertiary" />

            <Skeleton className="h-pr-17 w-pr-70" />
          </div>

          <div className="flex items-center">
            <Skeleton className="h-pr-17 w-pr-60" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="mb-pr-80 mt-pr-24 h-pr-24 w-pr-180" />
      </div>
    </div>
  );
}

export default ArticleDetailSkeleton;

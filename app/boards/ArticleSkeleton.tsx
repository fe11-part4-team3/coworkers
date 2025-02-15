import classNames from 'classnames';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * @param {'normal' | 'best'} props.type - 스켈레톤 타입 ('normal': 일반 게시글, 'best': 베스트 게시글)
 * @param {number} props.count - 생성할 스켈레톤 아이템 수
 * @returns {JSX.Element} 스켈레톤 UI 컴포넌트
 */
function ArticleSkeleton({
  type = 'normal',
  count,
}: {
  type?: 'normal' | 'best';
  count: number;
}) {
  const isBestSkeleton = type === 'best';

  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={classNames(
        isBestSkeleton
          ? 'h-pr-220 w-pr-387 mo:h-pr-178 ta:w-1/2'
          : 'h-pr-176 w-pr-590 mo:h-pr-162 ta:w-full',
        'flex flex-col justify-between space-y-3 rounded-xl bg-b-secondary p-pr-24 mo:w-full',
      )}
    >
      <div className="space-y-2">
        <Skeleton className="h-pr-20 w-pr-60" />
        <Skeleton className="h-pr-24 w-pr-200" />
        <Skeleton
          className={classNames(
            isBestSkeleton ? 'h-pr-24 w-pr-170 mo:hidden' : 'hidden',
          )}
        />
        <Skeleton className="h-pr-18 w-pr-80" />
      </div>
      <div className="flex items-center">
        <Skeleton className="size-pr-32 rounded-full" />
        <div className="ml-pr-12">
          <Skeleton className="h-pr-18 w-pr-50" />
        </div>
      </div>
    </div>
  ));
}

export default ArticleSkeleton;

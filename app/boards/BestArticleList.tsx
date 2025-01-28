import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import useGetArticle from '@/hooks/useGetArticle';

import ArticleSkeleton from './ArticleSkeleton';

/**
 * @param {string | undefined} props.keyword - 입력 검색어
 * @returns {JSX.Element} 베스트 게시글 리스트 컴포넌트
 */
function BestArticleList({ keyword }: { keyword: string | undefined }) {
  const deviceType = useDeviceType();
  let pageSize = 3;

  if (deviceType === 'tablet') {
    pageSize = 2;
  } else if (deviceType === 'mobile') {
    pageSize = 1;
  }

  const {
    data: bestArticleList,
    isLoading,
    isError,
  } = useGetArticle({
    queryKey: 'bestArticleList',
    pageSize: pageSize,
    orderBy: 'like',
    deviceType: deviceType,
  });

  if (isError) return '에러가 발생했습니다.';

  return (
    <>
      {!keyword ? (
        <section className="mt-pr-40 border border-x-0 border-t-0 pb-pr-40">
          <h3 className="text-20b">베스트 게시글</h3>

          <div className="mt-pr-32 flex gap-x-pr-20 ta:gap-pr-16">
            {!isLoading ? (
              <>
                {bestArticleList?.list.map((bestArticle) => {
                  return (
                    <ArticleCard
                      key={bestArticle.id}
                      type="best"
                      articleData={bestArticle}
                    />
                  );
                })}
              </>
            ) : (
              <ArticleSkeleton type="best" count={pageSize} />
            )}
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
}

export default BestArticleList;

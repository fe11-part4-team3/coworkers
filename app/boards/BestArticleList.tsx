import Autoplay from 'embla-carousel-autoplay';

import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import useGetArticle from '@/hooks/useGetArticle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import ArticleSkeleton from './ArticleSkeleton';

/**
 * @param {string | undefined} props.keyword - 입력 검색어
 * @returns {JSX.Element} 베스트 게시글 리스트 컴포넌트
 */
function BestArticleList() {
  const deviceType = useDeviceType();
  let pageSize = 5;

  if (deviceType === 'tablet') {
    pageSize = 4;
  } else if (deviceType === 'mobile') {
    pageSize = 3;
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
    <section className="mt-pr-40 border border-x-0 border-t-0 pb-pr-40 mo:mt-pr-24 mo:pb-pr-32">
      <h3 className="text-20b">베스트 게시글</h3>
      <div className="mt-pr-32 flex gap-x-pr-19 mo:mt-pr-24 ta:gap-x-pr-16">
        {!isLoading ? (
          <Carousel
            opts={{
              align: 'start',
            }}
            plugins={[
              Autoplay({
                delay: 2500,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {bestArticleList?.list.map((bestArticle) => {
                return (
                  <CarouselItem
                    key={bestArticle.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <ArticleCard type="best" articleData={bestArticle} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        ) : (
          <ArticleSkeleton type="best" count={pageSize - 2} />
        )}
      </div>
    </section>
  );
}

export default BestArticleList;

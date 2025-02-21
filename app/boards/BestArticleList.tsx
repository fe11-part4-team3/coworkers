import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';

import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import useGetArticle from '@/hooks/useGetArticle';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Indicators from '@/components/Indicators';

import ArticleSkeleton from './ArticleSkeleton';

const PAGE_SIZE = {
  desktop: 5,
  tablet: 4,
  mobile: 3,
};

/**
 * @returns {JSX.Element} 베스트 게시글 리스트 컴포넌트
 */
function BestArticleList() {
  const deviceType = useDeviceType();

  const [api, setApi] = useState<CarouselApi>();

  const {
    data: bestArticleList,
    isLoading,
    isError,
  } = useGetArticle({
    queryKey: 'bestArticleList',
    pageSize: PAGE_SIZE[deviceType],
    orderBy: 'like',
    deviceType: deviceType,
  });

  if (isError) return '에러가 발생했습니다.';

  return (
    <section className="mt-pr-40 border border-x-0 border-t-0 pb-pr-40 mo:mt-pr-24 mo:pb-pr-32">
      <h3 className="text-20b">베스트 게시글</h3>
      <div className="mt-pr-32 flex gap-x-pr-19 mo:mt-pr-24 ta:gap-x-pr-16">
        {!isLoading ? (
          <>
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
              setApi={setApi}
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

              <Indicators api={api} />
            </Carousel>
          </>
        ) : (
          <ArticleSkeleton type="best" count={PAGE_SIZE[deviceType] - 2} />
        )}
      </div>
    </section>
  );
}

export default BestArticleList;

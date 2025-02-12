import Image from 'next/image';

import IconBox from './Iconbox';

const LandingCardItemsthird = () => {
  return (
    <div className="relative h-pr-419 w-pr-996 rounded-pr-40 bg-slate-950 mo:h-pr-467 mo:w-pr-343 ta:h-pr-354 ta:w-pr-696">
      <div className="relative flex size-full rounded-pr-40 mo:flex-col-reverse">
        <div className="flex h-full w-1/2 items-start justify-end mo:w-full mo:items-start mo:justify-center">
          <Image
            src="/images/landing/img-LandingCardimgthird.png"
            alt="LandingCardimgthird"
            width={291}
            height={338}
            className="mr-pr-33 h-pr-338 w-pr-291 object-contain mo:absolute mo:left-1/2 mo:top-pr-0 mo:m-pr-0 mo:-translate-x-1/2 ta:mr-pr-7 tamo:h-pr-273 tamo:w-pr-235"
          />
        </div>

        <div className="flex h-full w-1/2 items-center justify-start mo:w-full mo:items-start mo:justify-start">
          <div className="bottom-pr-124 ml-pr-160 flex h-pr-120 flex-col gap-pr-16 text-24m mo:absolute mo:bottom-pr-51 mo:left-pr-54 mo:m-0 ta:right-pr-110 tamo:h-pr-106 tamo:w-pr-118 tamo:text-18m">
            <IconBox imageUrl="icon-check.svg" alt="Check Icon" />
            <p className="whitespace-nowrap text-t-primary">
              할 일도 간편하게
              <br />
              체크해요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCardItemsthird;

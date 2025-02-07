import Image from 'next/image';

import IconBox from './Iconbox';

const MainBox2 = () => {
  return (
    <div className="relative h-pr-419 w-pr-996 rounded-pr-40 bg-b-secondary mo:h-pr-467 mo:w-pr-343 ta:h-pr-354 ta:w-pr-696">
      <div className="relative flex size-full mo:flex-col-reverse">
        <div className="flex h-full w-1/2 items-center justify-end mo:w-full mo:items-end mo:justify-start">
          <div className="mr-pr-160 flex h-pr-120 flex-col gap-pr-16 text-24m mo:absolute mo:bottom-pr-52 mo:left-pr-54 mo:h-pr-106 mo:w-pr-129 ta:bottom-pr-124 ta:mr-pr-110 tamo:h-pr-106 tamo:w-auto tamo:text-18m">
            <IconBox imageUrl="messageicon.svg" alt="Message Icon" left />
            <p className="whitespace-nowrap text-right text-t-primary mo:text-left">
              간단하게 멤버들을
              <br />
              초대해요
            </p>
          </div>
        </div>

        <div className="flex h-full w-1/2 items-start justify-start mo:w-full mo:items-start mo:justify-center">
          <Image
            src="/images/landing/img-mockup2.png"
            alt="Mockup 2"
            width={291}
            height={338}
            className="h-pr-338 w-pr-291 object-contain mo:absolute mo:left-1/2 mo:top-0 mo:m-0 mo:h-pr-273 mo:w-pr-235 mo:-translate-x-1/2 ta:ml-pr-7 tamo:h-pr-273 tamo:w-pr-235"
          />
        </div>
      </div>
    </div>
  );
};

export default MainBox2;

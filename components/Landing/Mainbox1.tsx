import Image from 'next/image';

import IconBox from './Iconbox';

const MainBox1 = () => {
  return (
    <div className="relative mt-pr-60 h-pr-419 w-pr-996 rounded-pr-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-pr-1 mo:h-pr-467 mo:w-pr-343 ta:h-pr-354 ta:w-pr-696">
      <div className="relative flex size-full rounded-pr-40 bg-b-primary shadow-lg backdrop-blur-md mo:flex-col-reverse">
        <div className="flex h-full w-1/2 items-end justify-end mo:absolute mo:bottom-0 mo:w-full mo:items-end mo:justify-center">
          <Image
            src="/images/landing/img-mockup1.png"
            alt="Mockup 1"
            width={291}
            height={338}
            className="h-pr-338 w-pr-291 object-contain mo:m-0 mo:h-pr-273 mo:w-pr-235 ta:mr-pr-7 tamo:h-pr-273 tamo:w-pr-235"
          />
        </div>

        <div className="flex h-full w-1/2 items-center justify-start mo:w-full mo:items-start mo:justify-start">
          <div className="bottom-pr-124 ml-pr-160 flex h-pr-120 w-pr-157 flex-col gap-pr-16 text-24m mo:absolute mo:left-pr-54 mo:top-pr-48 mo:m-0 mo:h-pr-106 mo:w-pr-118 ta:ml-pr-110 tamo:h-pr-106 tamo:w-pr-118 tamo:text-18m">
            <IconBox imageUrl="foldericon.svg" alt="Folder Icon" />
            <p className="whitespace-nowrap text-t-primary">
              그룹으로
              <br />할 일을 관리해요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBox1;

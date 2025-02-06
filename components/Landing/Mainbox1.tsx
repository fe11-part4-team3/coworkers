import Image from 'next/image';
import IconBox from './Iconbox';

const MainBox1 = () => {
  return (
    <div className="relative mt-pr-60 h-pr-419 w-pr-996 rounded-pr-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-pr-1 mo:h-pr-487 mo:w-pr-343 ta:h-pr-354 ta:w-pr-696">
      <div className="relative flex h-full w-full rounded-pr-40 bg-b-primary shadow-lg backdrop-blur-md">
        {/* 이미지 */}
        <Image
          src="/images/landing/img-mockup1.png"
          alt="Mockup 1"
          width={291}
          height={338}
          className="absolute bottom-0 left-pr-174 h-pr-338 w-pr-291 object-contain mo:bottom-0 mo:left-1/2 mo:h-pr-273 mo:w-pr-235 mo:-translate-x-1/2 ta:bottom-0 ta:left-pr-120 ta:h-pr-273 ta:w-pr-235"
        />

        {/* 아이콘텍스트 박스 */}
        <div className="absolute right-pr-181 top-pr-155 h-pr-120 w-pr-157 mo:right-pr-54 mo:top-pr-48 mo:h-pr-106 mo:w-pr-118 ta:left-pr-121 ta:top-pr-124 ta:h-pr-106 ta:w-pr-118">
          <IconBox imageUrl="foldericon.svg" alt="Folder Icon" left />

          {/* 텍스트 */}
          <p className="absolute bottom-0 whitespace-nowrap text-24m leading-none text-t-primary mo:text-18m">
            그룹으로
            <br />할 일을 관리해요
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainBox1;

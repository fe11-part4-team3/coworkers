import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          src="/images/img-Logo.png"
          alt="로고"
          layout="intrinsic"
          width={158}
          height={32}
        />
      </Link>
    </div>
  );
};

export default Logo;

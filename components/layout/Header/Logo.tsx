import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/img-Logo.svg"
        alt="로고"
        layout="intrinsic"
        width={158}
        height={32}
      />
    </Link>
  );
}

export default Logo;

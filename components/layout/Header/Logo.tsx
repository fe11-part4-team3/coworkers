import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/images/img-Logo.svg"
        alt="로고"
        width={158}
        height={32}
        priority
      />
    </Link>
  );
}

export default Logo;

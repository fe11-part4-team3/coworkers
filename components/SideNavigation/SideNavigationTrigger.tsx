'use client';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '../ui/button';
import { useSidebar } from '../ui/sidebar';
import React from 'react';
import Image from 'next/image';

interface SideNavigationTriggerProps extends ButtonProps {
  src: string;
  alt: string;
  iconSize?: number;
}

function SideNavigationTrigger({
  src,
  alt,
  iconSize = 24,
  className,
  onClick,
  ...props
}: SideNavigationTriggerProps) {
  const { toggleSidebar } = useSidebar();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onClick?.(event);
    toggleSidebar();
  };

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={handleClick}
      {...props}
    >
      <Image
        width={iconSize}
        height={iconSize}
        src={src}
        alt={alt}
      />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export default SideNavigationTrigger;

'use client';

import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Button, ButtonProps } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

interface SideNavigationTriggerProps extends ButtonProps {
  src: string;
  alt: string;
  iconSize?: number;
}

/**
 * 사이드 네비게이션 렌더링 트리거
 * @param props
 * @param props.src 아이콘 경로
 * @param props.alt 버튼 설명
 * @param props.iconSize 아이콘 크기
 */
function SideNavigationTrigger({
  src,
  alt,
  iconSize = 24,
  className,
  ...props
}: SideNavigationTriggerProps) {
  const { toggleSidebar } = useSidebar();

  const handleClick = () => toggleSidebar();

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={handleClick}
      {...props}
    >
      <Image width={iconSize} height={iconSize} src={src} alt={alt} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export default SideNavigationTrigger;

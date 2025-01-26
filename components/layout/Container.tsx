import { ContainerProps } from '@/types/container.types';

/**
 * Container Layout 컴포넌트
 * @param {React.ReactNode} props.children 자식 노드
 * @param {string} props.className 커스텀 클래스
 */
export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <main
      className={`${className} mx-auto w-pr-1280 px-pr-40 pt-pr-60 mo:px-pr-16 ta:px-pr-25 tamo:w-full`}
    >
      {children}
    </main>
  );
}

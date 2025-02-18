import { motion } from 'framer-motion';

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
      className={`${className} mx-auto mt-pr-60 w-pr-1280 px-pr-40 mo:px-pr-16 ta:px-pr-25 tamo:w-full`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
        className="mo:w-full"
      >
        {children}
      </motion.div>
    </main>
  );
}

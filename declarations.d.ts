/*
 * svgr로 아이콘 컴포넌트를 만들 때 svg 파일을 import 할 수 있도록 선언합니다.
 */

declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  export { ReactComponent };
}

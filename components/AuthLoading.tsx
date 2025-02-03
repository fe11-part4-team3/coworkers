import { Loader2 } from 'lucide-react';

/**
 * 인증 로딩 컴포넌트
 */
export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-pr-10">
        <Loader2 className="animate-spin" />
        <p className="text-24b">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

/**
 * 메시지 여부를 통해 fade-in/out 처리하는 훅
 * @param message 메시지
 * @param fadeDuration fade-out 지속 시간(fadeOut 애니메이션 타임과 동일해야함)
 * @example
 * const { fadingMessage, animationClass } = useFadeMessage('메시지');
 * return <div className={animationClass}>{fadingMessage}</div>;
 */
export default function useFadeMessage(
  message: string | undefined,
  fadeDuration = 500,
) {
  const [fadingMessage, setFadingMessage] = useState(message);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (message) {
      // STUB 새 메시지 세팅
      setFadingMessage(message);
      setIsFadingOut(false);
    } else if (fadingMessage) {
      // STUB 기존 메시지 사라짐 -> fadeOut 후 setFadingMessage('')
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setFadingMessage('');
        setIsFadingOut(false);
      }, fadeDuration);
      return () => clearTimeout(timer);
    }
  }, [message, fadingMessage, fadeDuration]);

  const animationClass = isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn';

  return { fadingMessage, animationClass };
}

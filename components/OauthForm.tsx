export default function OauthForm({ type }: { type: 'login' | 'signup' }) {
  return (
    <>
      <div className="mb-pr-16 flex items-center justify-center gap-pr-24">
        <hr className="w-full" />
        <span className="text-16 mo:text-16m">OR</span>
        <hr className="w-full" />
      </div>
      <div className="flex justify-center gap-pr-16">
        <p className="flex-1">
          {type === 'login' ? '간편 로그인하기' : '간편 회원가입하기'}
        </p>
        <button
          className="icon_oauth-google"
          onClick={() => console.log('구글 로그인 클릭')}
        >
          <span className="sr-only">구글 로그인</span>
        </button>
        <button
          className="icon_oauth-kakao"
          onClick={() => console.log('카카오 로그인 클릭')}
        >
          <span className="sr-only">카카오 로그인</span>
        </button>
      </div>
    </>
  );
}

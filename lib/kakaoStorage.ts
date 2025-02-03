/**
 * @description 카카오 로그인 시 발급받은 토큰을 저장하는 로컬 스토리지
 */

// 로컬 스토리지에서 값 가져오기 함수들
const getLoginProcessed = () => localStorage.getItem('kakaoLoginProcessed');
const getProfileUpdated = () => localStorage.getItem('profileUpdated');
const getKakaoAccessToken = () => localStorage.getItem('kakaoAccessToken');
const getKakaoRefreshToken = () => localStorage.getItem('kakaoRefreshToken');

// 로컬 스토리지에 값 저장하기 함수들
const setLoginProcessed = () =>
  localStorage.setItem('kakaoLoginProcessed', 'true');
const setProfileUpdated = () => localStorage.setItem('profileUpdated', 'true');

// 로컬 스토리지에서 값 삭제하기 함수들
const removeLoginProcessed = () =>
  localStorage.removeItem('kakaoLoginProcessed');
const removeProfileUpdated = () => localStorage.removeItem('profileUpdated');
const removeKakaoAccessToken = () =>
  localStorage.removeItem('kakaoAccessToken');
const removeKakaoRefreshToken = () =>
  localStorage.removeItem('kakaoRefreshToken');

// 카카오 회원 탈퇴 시 로컬 스토리지에 저장된 토큰 정보를 삭제하는 함수
const revokeKakaoAccessStorage = () => {
  removeKakaoAccessToken();
  removeKakaoRefreshToken();
  removeLoginProcessed();
  removeProfileUpdated();
};

// 카카오 로그아웃 시 로컬 스토리지에 저장된 토큰 정보를 삭제하는 함수
const logoutKakaoAccessStorage = () => {
  removeLoginProcessed();
};

export {
  getLoginProcessed,
  getProfileUpdated,
  getKakaoAccessToken,
  getKakaoRefreshToken,
  setLoginProcessed,
  setProfileUpdated,
  revokeKakaoAccessStorage,
  logoutKakaoAccessStorage,
};

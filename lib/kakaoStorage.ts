/**
 * @description 카카오 로그인 시 발급받은 토큰을 저장하는 로컬 스토리지
 */

// 로컬 스토리지에서 값 가져오기 함수들
const getProfileUpdated = () => localStorage.getItem('profileUpdated');
const getLoginProcessed = () => localStorage.getItem('loginProcessed');

// 로컬 스토리지에 값 저장하기 함수들
const setProfileUpdated = () => localStorage.setItem('profileUpdated', 'true');
const setLoginProcessed = () => localStorage.setItem('loginProcessed', 'true');

// 로컬 스토리지에서 값 삭제하기 함수들
const removeProfileUpdated = () => localStorage.removeItem('profileUpdated');
const removeLoginProcessed = () => localStorage.removeItem('loginProcessed');

export {
  getProfileUpdated,
  setProfileUpdated,
  removeProfileUpdated,
  getLoginProcessed,
  setLoginProcessed,
  removeLoginProcessed,
};

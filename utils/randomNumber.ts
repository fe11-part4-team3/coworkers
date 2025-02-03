/**
 * 중복되지않는 5자리 랜덤 숫자를 생성합니다.
 * @returns
 * 5자리 랜덤 숫자
 */
const randomNumber5 = () => {
  let digits = '';
  for (let i = 0; i < 5; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
};

export default randomNumber5;

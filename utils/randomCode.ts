/**
 * 중복되지않는 랜덤 숫자를 생성합니다.
 * @returns
 * 랜덤 숫자
 */
const generateRandomNumber = (length: number): string => {
  let digits = '';
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
};

export { generateRandomNumber };

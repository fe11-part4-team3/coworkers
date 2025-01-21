/**
 * @description prefix로 필터링
 * @param {string} input - 입력값
 * @param {string} prefix - 필터링할 prefix
 * @returns {string} 필터링된 문자열
 */
// prefix로 필터링
export const filterByPrefix = (input: string, prefix: string): string => {
  const str = input.split(' ');
  const splitArr = str.filter((item) =>
    new RegExp(`(^|\\b)(\\w*:)?${prefix}`).test(item),
  );
  if (splitArr.length === 0) throw new Error('width 값이 없습니다.');
  return splitArr.join(' ');
};

// w-pr 관련 항목 필터링
export const widthStyledSliceWPr = (width: string) =>
  filterByPrefix(width, 'w-pr');

// h-pr 관련 항목 필터링
export const heightStyledSliceWPr = (height: string) =>
  filterByPrefix(height, 'h-pr');

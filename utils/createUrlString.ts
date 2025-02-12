interface CreateUrlStringParams {
  origin?: string;
  pathname?: (string | number)[];
  queryParams?: Record<string, string | number>;
}

/**
 * ### URL 문자열을 생성하는 함수
 * @param {CreateUrlStringParams} params - URL 생성에 필요한 매개변수
 * @param {string} [params.origin] - 베이스 URL (기본값: 현재 페이지의 origin)
 * @param {(string|number)[]} [params.pathname] - URL 경로 배열
 * @param {Record<string, string|number>} [params.queryParams] - URL 쿼리 파라미터 객체
 *
 * @returns {string} 생성된 URL 문자열
 *
 * @example
 * ```ts
 * // 상대 경로 사용법
 * // /users/123/profile?sort=name&order=asc
 * const url = createUrlString({
 *   pathname: ['users', 123, 'profile'],
 *   searchParams: { sort: 'name', order: 'asc' }
 * });
 *
 * // 절대 경로 사용법
 * // https://example.com/api/v1/data?limit=10&offset=20
 * const customUrl = createUrlString({
 *   origin: 'https://example.com',
 *   pathname: ['api', 'v1', 'data'],
 *   searchParams: { limit: 10, offset: 20 }
 * });
 */
const createUrlString = ({
  origin,
  pathname,
  queryParams,
}: CreateUrlStringParams = {}) => {
  const url = new URL(origin || location.origin);

  if (pathname) {
    url.pathname = '/' + pathname.map(String).join('/');
  }

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, String(value));
    }
  }
  return origin ? url.toString() : url.pathname + url.search;
};

export default createUrlString;

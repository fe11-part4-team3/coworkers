import { useMutation, UseMutationResult } from '@tanstack/react-query';
import useUser from '@/hooks/useUser';

/**
 * @description
 * - TParams: API 함수에 전달되는 파라미터 타입
 * - TData: API 함수가 정상적으로 반환하는 데이터 타입
 * - TError: 오류 타입 (기본값: Error)
 */
export interface UseGenericMutationOptions<TParams, TData, TError> {
  /**
   * @description 요청 성공 시 호출할 사용자 정의 onSuccess 콜백
   */
  onSuccess?: (data: TData, variables: TParams, context: unknown) => void;
  /**
   * @description 요청 실패 시 호출할 사용자 정의 onError 콜백
   */
  onError?: (error: TError, variables: TParams, context: unknown) => void;
  /**
   * @description 요청 성공 후 실행할 초기화 함수들 (ex. 이미지/닉네임 상태 초기화 등)
   */
  resetFunctions?: Array<() => void>;
}

type UseGenericMutationReturn<TParams, TData, TError = Error> = {
  mutate: UseMutationResult<TData, TError, TParams>['mutate'];
  isPending: boolean;
};

/**
 * 공통 Mutation Hook
 * @param mutationFn API 함수
 * @param options Mutation 옵션
 * @returns Mutation 함수 및 로딩 상태
 * @example
 * ```ts
 * const { mutate, isPending } = useGenericMutation(API 함수, {
 *  onSuccess: 커스텀 onSuccess 콜백,
 *  onError: 커스텀 onError 콜백,
 *  resetFunctions: [상태 초기화 함수 배열로 전달],
 * });
 *
 * // mutate 함수를 이용해 API 요청
 * const handleSubmit = () => {
 *
 * // API 함수에 전달할 파라미터
 *  mutate({ params });
 * };
 * ```
 */
const useGenericMutation = <TParams, TData, TError = Error>(
  mutationFn: (params: TParams) => Promise<TData>,
  options?: UseGenericMutationOptions<TParams, TData, TError>,
): UseGenericMutationReturn<TParams, TData, TError> => {
  const { reload } = useUser(true);

  const { onSuccess, onError, resetFunctions = [] } = options || {};

  const { mutate, isPending } = useMutation<TData, TError, TParams>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // 사용자가 onSuccess를 제공했다면 그걸 사용, 아니면 기본 처리
      if (onSuccess) {
        onSuccess(data, variables, context);
      } else {
        alert('요청이 성공적으로 처리되었습니다.');
      }

      // 초기화 함수 실행
      resetFunctions.forEach((resetFn) => resetFn());

      // 사용자 정보 다시 불러오기
      reload();
    },
    onError: (error, variables, context) => {
      // 사용자가 onError를 제공했다면 그걸 사용, 아니면 기본 처리
      if (onError) {
        onError(error, variables, context);
      } else {
        alert('요청 처리에 실패했습니다.');
        console.error(error);
      }
    },
  });

  return {
    mutate,
    isPending,
  };
};

export default useGenericMutation;

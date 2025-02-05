import { FormValue } from '@/hooks/useForm';
import { uploadImage } from '@/service/image.api';

export type UpdatePayloadParams = {
  [key: string]: string | number | boolean | undefined | File;
  image?: string;
};

interface updatePayloadSubmitProps<T> {
  changedFields: Record<string, boolean>;
  formData: Record<string, FormValue>;
  mutate: (payload: T) => void;
  articleId?: number;
}

/**
 * 변경된 필드만 payload에 추가하여 부분 패치를 진행하는 onSubmit 함수
 * 이미지 변경 시 url 변환 포함
 * @param changedFields 변경된 필드 상태
 * @param formData form 데이터
 * @param mutate 수정 요청 함수
 * @returns
 * - 변경된 필드가 없을 경우 patch 요청을 하지 않음
 * - 변경된 필드만 payload에 추가하여 patch 요청
 * @example
 * ```ts
 * const { user } = useUser(true);
 *
 * const {
    formData: 변경해서 쓸 formData 명(필요시),
    changedFields,
    setChangedFields,
    handleInputChange,
    handleFileChange,
 * } = useForm<{
    image: string | File; // 해당 image 타입에 string | File 필수
    nickname: string;
  }>({
 *   image: user?.image || '',
 *   nickname: user?.nickname || '',
 * });
 *
 * const { mutate: 뮤테이트 함수 명, isPending: pending 상태 명 } = useGenericMutation(사용할 함수 명, {
 *  onSuccess: 성공 시 보여줄 로직(없을 시 기본값),
 *  onError: 실패 시 보여줄 로직(없을 시 기본값),
 *  resetFunctions: [() => setChangedFields({})], // 변경 상태 필드 전체 초기화 로직
 * });
 *
 * const handleSubmit = async () => updatePayloadSubmit({ changedFields, formData: 변경해서 쓸 formData 명(필요시), mutate: 뮤테이트 함수 명 });
 *
 * // 사용 예시
 * <Profile
 *  onSelectFile={(file) => handleFileChange('image', file)}
 *  image={user.image}
 * />
 *
 * <InputField
 *  value={formData.nickname}
 *  placeholder={user.nickname}
 *  name="nickname"
 *  onChange={(e) => {handleInputChange(e);}}
 *  label="이름"
 * />
 *
 * <Buttons onClick={handleSubmit}>
 * ```
 *
 */
const updatePayloadSubmit = async <T>({
  articleId,
  changedFields,
  formData,
  mutate,
}: updatePayloadSubmitProps<T>): Promise<void> => {
  if (!Object.values(changedFields).some(Boolean)) {
    console.log('[updatePayloadSubmit] 변경된 필드 없음, patch 생략');
    return;
  }

  // 변경된 필드만 payload에 추가
  const payload: Partial<UpdatePayloadParams> = {};

  // articleId가 존재할 경우 추가
  if (articleId) {
    payload.articleId = articleId;
  }

  // formData의 변경된 필드만 payload에 추가
  await Promise.all(
    Object.entries(changedFields).map(async ([key, hasChanged]) => {
      if (!hasChanged) return;

      const value = formData[key];

      if (key === 'image' && value instanceof File) {
        try {
          payload.image = await uploadImage(value);
        } catch (err) {
          console.error('[updatePayloadSubmit] 이미지 업로드 실패:', err);
          throw new Error('이미지 업로드 실패');
        }
      } else {
        payload[key] = value;
      }
    }),
  );

  mutate(payload as T);
};

export default updatePayloadSubmit;

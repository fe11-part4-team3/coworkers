import { uploadImage } from '@/service/image.api';
import { TFormValue } from '@/types/useForm.type';

export type UpdatePayloadParams = {
  [key: string]: string | number | boolean | undefined | File;
  image?: string;
};

interface updatePayloadSubmitProps<T> {
  changedFields: Record<string, boolean>;
  formData: Record<string, TFormValue>;
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
 */
const updatePayloadSubmit = async <T>({
  articleId,
  changedFields,
  formData,
  mutate,
}: updatePayloadSubmitProps<T>): Promise<void> => {
  if (!Object.values(changedFields).some(Boolean)) {
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
          throw new Error('이미지 업로드 실패', { cause: err });
        }
      } else {
        // TFormValue 타입이 Date인 경우 string으로 변환
        if (value instanceof Date) {
          payload[key] = value.toISOString();
        } else if (Array.isArray(value)) {
          // 배열인 경우 처리하지 않음
          return;
        } else {
          payload[key] = value;
        }
      }
    }),
  );

  mutate(payload as T);
};

export default updatePayloadSubmit;

import instance from './axios';

/**
 * 이미지 업로드, 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다.
 * @param props.file 업로드할 이미지 파일
 * @example
 * ```ts
 * const url = await uploadImage(file);
 * console.log(url); // 'https://api.velog.io/static/...'
 * ```
 * @returns 이미지 url
 */
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await instance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.url;
};

export { uploadImage };

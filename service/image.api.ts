import instance from './axios';

/**
 * 이미지 업로드, 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다.
 * 
 * **※이미지 FormData 얻는법**
 * ```ts
 * const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('image', files[0], files[0].name);
      onSubmit(formData);
    }
  };
 * ```
 * @returns 이미지 url
 */
const uploadImage = async (image: FormData): Promise<string> => {
  const response = await instance.post('/images/upload', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.url;
};

export { uploadImage };

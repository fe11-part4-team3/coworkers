'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { uploadImage } from '@/service/image.api';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { createGroup } from '@/service/group.api';
import Profile from '@/components/Profile/Profile';
import useUser from '@/hooks/useUser';

export default function AddTeamPage() {
  const { formData, handleInputChange, setFormData } = useForm({
    name: '',
    image: '',
  });
  const [preview, setPreview] = useState<File | null>(null);
  const { user, reload } = useUser();

  const route = useRouter();

  // STUB 이미지 업로드
  const handleFileChange = (file: File) => {
    console.log('[handleFileChange] 파일 변경 감지:', file);

    setPreview(file);
  };

  // STUB 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!preview) {
        alert('이미지를 업로드해주세요.');
        return;
      }

      // STUB 새로운 FormData 인스턴스를 생성하고 이미지를 추가합니다.
      const url = await uploadImage(preview);

      // STUB 이미지 업로드가 완료되면 formData에 이미지 URL을 추가합니다.
      const newFormData = { ...formData, image: url };
      setFormData(newFormData);
      console.log('이미지 업로드가 완료되었습니다', url);

      // STUB 팀을 생성합니다.
      const response = await createGroup(newFormData);
      response.teamId = '11-3';
      console.log('팀 생성이 완료되었습니다', response);
      reload();

      if (!user) {
        console.error('사용자 정보가 없습니다.');
        return;
      }

      route.push(`/${response.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>팀생성</h1>
      <form onSubmit={handleSubmit}>
        <Profile
          variant="group"
          onSelectFile={handleFileChange}
          isEdit={true}
        />

        <InputField
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
          name="name"
          placeholder="팀 이름을 입력해주세요."
        />
        <Button type="submit">생성하기</Button>
      </form>
    </Container>
  );
}

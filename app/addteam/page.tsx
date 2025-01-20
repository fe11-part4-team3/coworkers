'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { uploadImage } from '@/service/image.api';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createGroup } from '@/service/group.api';

export default function AddTeamPage() {
  const { formData, handleChange, setFormData } = useForm({
    name: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const route = useRouter();

  // STUB 기본 이미지
  // TODO 이미지 업로드 컴포넌트 완료 시 대체함
  const defaultImage = '/images/icon-profile-member-default.svg';

  // STUB 이미지 업로드
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result as string);
      const formData = new FormData();
      formData.append('image', file, file.name);
      uploadImage(formData);
    };
  };

  // STUB 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!imageFile) {
        alert('이미지를 업로드해주세요.');
        return;
      }

      const formImageData = new FormData();
      // STUB 새로운 FormData 인스턴스를 생성하고 이미지를 추가합니다.
      formImageData.append('image', imageFile, imageFile.name);
      const url = await uploadImage(formImageData);

      // STUB 이미지 업로드가 완료되면 formData에 이미지 URL을 추가합니다.
      const newFormData = { ...formData, image: url };
      setFormData(newFormData);
      console.log('이미지 업로드가 완료되었습니다', url);

      // STUB 팀을 생성합니다.
      const response = await createGroup(newFormData);
      console.log('팀 생성이 완료되었습니다', response);

      route.push(`/${response.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>팀생성</h1>
      <form onSubmit={handleSubmit}>
        {/* TODO 이미지 업로드 컴포넌트 완료 시 대체함 */}
        <Input type="file" name="image" onChange={handleImageChange} />
        <Image
          priority
          src={imagePreview ? imagePreview : defaultImage}
          alt="team image"
          width={64}
          height={64}
          className="overflow-hidden rounded-full"
        />

        <InputField
          value={formData.name}
          onChange={handleChange}
          name="name"
          placeholder="팀 이름을 입력해주세요."
        />
        <Button type="submit">생성하기</Button>
      </form>
    </Container>
  );
}

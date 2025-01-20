'use client';

import InputField from '@/components/InputField/InputField';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import useForm from '@/hooks/useForm';

export default function AddTeamPage() {
  const { formData, handleChange } = useForm({ name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container>
      <h1>팀생성</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" />
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

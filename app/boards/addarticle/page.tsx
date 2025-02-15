'use client';

import { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import Buttons from '@/components/Buttons';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import InputField from '@/components/InputField/InputField';
import TextareaField from '@/components/InputField/TextareaField';
import Container from '@/components/layout/Container';
import useForm from '@/hooks/useForm';
import { createArticle } from '@/service/article.api';
import updatePayloadSubmit from '@/utils/updatePayload';
import { useSnackbar } from '@/contexts/SnackBar.context';

const INITIAL_VALUES = {
  title: '',
  content: '',
};

export default function AddArticlePage() {
  const {
    preview,
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    handleClearPreview,
    resetForm,
  } = useForm(INITIAL_VALUES);

  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const { mutate, isPending } = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      showSnackbar('게시글이 생성되었습니다.');
      router.push('/boards');
      resetForm();
    },
    onError: () => {
      showSnackbar('게시글 생성에 실패했습니다.', 'error');
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await updatePayloadSubmit({
        changedFields: changedFields as Record<string, boolean>,
        formData,
        mutate: mutate,
      });
    },
    [changedFields, formData, mutate],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="my-pr-56 mo:mb-pr-118">
          <div className="flex items-center justify-between border border-x-0 border-t-0 pb-pr-40 text-18 mo:pb-pr-30 ta:pb-pr-32">
            <h2 className="text-20b mo:text-18m">게시글 쓰기</h2>

            <div className="z-10 mo:fixed mo:bottom-pr-31 mo:left-0 mo:w-full mo:px-pr-16">
              <Buttons
                text="등록"
                className="w-pr-184 mo:w-full"
                disabled={
                  isPending || formData.title === '' || formData.content === ''
                }
                loading={isPending}
              />
            </div>
          </div>

          <div className="mt-pr-40 mo:mt-pr-24 ta:mt-pr-32">
            <InputField
              name="title"
              type="text"
              value={formData.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              label="제목"
              essential={true}
              placeholder="제목을 입력해주세요."
            />
          </div>

          <div className="mt-pr-40 tamo:mt-pr-32">
            <TextareaField
              name="content"
              value={formData.content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                handleInputChange(e);
              }}
              size="lg"
              height="h-pr-240"
              label="내용"
              essential={true}
              placeholder="내용을 입력해주세요."
            />
          </div>

          <div className="mt-pr-40 tamo:mt-pr-32">
            <ImageUpload
              preview={preview ?? null}
              handleFileChange={handleFileChange}
              handleClearPreview={handleClearPreview}
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import Buttons from '@/components/Buttons';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import InputField from '@/components/InputField/InputField';
import TextareaField from '@/components/InputField/TextareaField';
import Container from '@/components/layout/Container';
import useForm from '@/hooks/useForm';
import { getArticleDetail, updateArticle } from '@/service/article.api';
import updatePayloadSubmit from '@/utils/updatePayload';

const INITIAL_VALUES = {
  title: '',
  content: '',
  image: '',
};

function EditArticlePage() {
  const {
    preview,
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    handleClearImage,
    resetForm,
  } = useForm(INITIAL_VALUES);

  const [prevValue, setPrevValue] = useState(INITIAL_VALUES);

  const router = useRouter();
  const { articleId } = useParams();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      alert('게시글이 수정되었습니다.');
      router.push('/boards');
      resetForm();
    },
    onError: () => {
      alert('게시글 수정에 실패했습니다.');
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await updatePayloadSubmit({
        articleId: Number(articleId),
        changedFields: changedFields as Record<string, boolean>,
        formData,
        mutate: mutate,
      });
    },
    [changedFields, formData, mutate, articleId],
  );

  useEffect(() => {
    const fetchArticleData = async () => {
      if (articleId) {
        const response = await getArticleDetail({
          articleId: Number(articleId),
        });
        const values = {
          title: response.title,
          content: response.content,
          image: response.image ?? '',
        };
        resetForm(values);
        setPrevValue(values);
      }
    };
    fetchArticleData();
  }, [articleId]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="my-pr-56 mo:mb-pr-118">
          <div className="flex items-center justify-between border border-x-0 border-t-0 pb-pr-40 text-18 mo:pb-pr-30 ta:pb-pr-32">
            <h2 className="text-20b mo:text-18m">게시글 수정</h2>

            <div className="z-10 mo:fixed mo:bottom-pr-31 mo:left-0 mo:w-full mo:px-pr-16">
              <Buttons
                text="수정"
                className="w-pr-184 mo:w-full"
                disabled={
                  formData.title === prevValue.title &&
                  formData.content === prevValue.content &&
                  formData.image === prevValue.image
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
              onChange={handleTitleChange}
              label="제목"
              essential={true}
              placeholder="제목을 입력해주세요."
            />
          </div>

          <div className="mt-pr-40 tamo:mt-pr-32">
            <TextareaField
              name="content"
              value={formData.content}
              onChange={handleContentChange}
              size="lg"
              height="h-pr-240"
              label="내용"
              essential={true}
              placeholder="내용을 입력해주세요."
            />
          </div>

          <div className="mt-pr-40 tamo:mt-pr-32">
            <ImageUpload
              preview={preview ?? formData.image ?? null}
              handleFileChange={handleFileChange}
              handleClearImage={handleClearImage}
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default EditArticlePage;

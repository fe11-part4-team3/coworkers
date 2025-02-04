import {
  CreateArticleParams,
  DeleteArticleDetailParams,
  GetArticleDetailParams,
  GetArticleListParams,
  IArticle,
  IArticleDetail,
  IArticleList,
  LikeArticleParams,
  UnlikeArticleParams,
  UpdateArticleParams,
} from '@/types/article.type';

import instance from './axios';

/**
 * @param param.title 1~200자 제한
 */
const createArticle = async ({
  image,
  content,
  title,
}: CreateArticleParams): Promise<IArticle> => {
  const response = await instance.post('/articles', {
    image,
    content,
    title,
  });
  return response.data;
};

/**
 * @param param.page default 1
 * @param param.pageSize default 10
 * @param param.orderBy 'recent' | 'like'
 */
const getArticleList = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: GetArticleListParams): Promise<IArticleList> => {
  const response = await instance.get('/articles', {
    params: {
      page,
      pageSize,
      orderBy,
      keyword,
    },
  });
  return response.data;
};

const getArticleDetail = async ({
  articleId,
}: GetArticleDetailParams): Promise<IArticleDetail> => {
  const response = await instance.get(`/articles/${articleId}`);
  return response.data;
};

const updateArticle = async ({
  articleId,
  image,
  content,
  title,
}: UpdateArticleParams): Promise<IArticleDetail> => {
  const response = await instance.patch(`/articles/${articleId}`, {
    image,
    content,
    title,
  });
  return response.data;
};

/**
 * @returns 삭제된 Article ID
 */
const deleteArticle = async ({
  articleId,
}: DeleteArticleDetailParams): Promise<number> => {
  const response = await instance.delete(`/articles/${articleId}`);
  return response.data.id;
};

const likeArticle = async ({
  articleId,
}: LikeArticleParams): Promise<IArticleDetail> => {
  const response = await instance.post(`/articles/${articleId}/like`);
  return response.data;
};

const unlikeArticle = async ({
  articleId,
}: UnlikeArticleParams): Promise<IArticleDetail> => {
  const response = await instance.delete(`/articles/${articleId}/like`);
  return response.data;
};

export {
  createArticle,
  getArticleList,
  getArticleDetail,
  updateArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
};

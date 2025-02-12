interface IArticle {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  title: string;
  id: number;
}

interface IArticleDetail extends IArticle {
  commentCount: number;
  isLiked: boolean;
  content: string;
}

interface IArticleList {
  totalCount: number;
  list: IArticle[];
}

interface CreateArticleParams {
  image?: string;
  content: string;
  title: string;
}

interface GetArticleListParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
}

interface GetArticleDetailParams {
  articleId: number;
}

interface UpdateArticleParams {
  articleId: number;
  image?: string;
  content: string;
  title: string;
}

interface DeleteArticleDetailParams {
  articleId: number;
}

interface LikeArticleParams {
  articleId: number;
}

interface UnlikeArticleParams {
  articleId: number;
}

export type {
  IArticle,
  IArticleDetail,
  IArticleList,
  CreateArticleParams,
  GetArticleListParams,
  GetArticleDetailParams,
  UpdateArticleParams,
  DeleteArticleDetailParams,
  LikeArticleParams,
  UnlikeArticleParams,
};

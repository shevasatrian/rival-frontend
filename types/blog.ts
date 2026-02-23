export interface FeedItem {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  author: {
    id: string;
    email: string;
  };
  likeCount: number;
  commentCount: number;
}

export interface FeedResponse {
  data: FeedItem[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}
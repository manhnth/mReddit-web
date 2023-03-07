export interface Post {
  id: number;
  author: any;
  createAt: string;
  nbComments: number;
  point: number;
  self: string;
  subreddit: any;
  text: string;
  title: string;
  updateAt: string;
  voteStatus: number;
  isOwner: boolean;
  userUpdoot: any;
}

export interface FeedResponse {
  feed: Post[];
  totalPage: number;
  nextPage: number;
  page: number;
}

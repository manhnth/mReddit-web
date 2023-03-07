import { axiosApi, axiosWToken } from '@/lib/axios';
import { PostData } from './type';

//***** MUTATE *****/

export const createPost = (createPostData: PostData) =>
  axiosWToken.post('post', createPostData).then((res) => {
    return res.data.createdPost;
  });

// export const updatePost = (createPostData: PostData) =>
//   axiosWToken
//     .post('post', createPostData)
//     .then((res) => res.data.updatedPost.self);

export const deletePost = async (self: string) => {
  return axiosWToken.delete(self);
};

export const vote = async ({
  self,
  value,
}: {
  self: string;
  value: number;
}) => {
  await axiosWToken.post(`${self}/vote`, { value });
};

//***** QUERY *****/

interface UpdatePostData {
  self: string;
  postData: PostData;
}

export const getPostById = (postId: string) =>
  axiosWToken.get(`post/${postId}`).then((res) => {
    return res.data.post;
  });

export const updatePost = (updatePostData: UpdatePostData) =>
  axiosWToken
    .patch<any>(updatePostData.self, updatePostData.postData)
    .then((res) => {
      return res.data;
    });

export const getPostQuery = (postId: string) => ({
  queryKey: ['post', postId],
  queryFn: async () => {
    const post = await getPostById(postId);
    return post || null;
  },
});

export const search = async (query: string) => {
  const result = await axiosWToken.get(`/post/search?q=${query}`);

  return result.data.posts;
};

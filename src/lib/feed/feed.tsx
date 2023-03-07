import { axiosApi, axiosWToken } from '@/lib/axios';
import { getRefreshToken, setTokens } from '@/utils/token';
import { FeedResponse } from './type';

export const me = () =>
  axiosWToken.get('auth/me').then((res) => {
    return res.data.currentUser;
  });

export const refresh = () =>
  axiosApi
    .post('auth/refresh', {
      refreshToken: getRefreshToken(),
    })
    .then((res) => {
      setTokens(res.data.tokens);

      return res.data.user;
    })
    .catch((error) => {
      return null;
    });

export const getGlobalFeed = (param?: string, page?: number) =>
  axiosWToken
    .get(`feed/?sort_by=${param || ''}&page=${page}`)
    .then<FeedResponse>((res) => {
      return res.data;
    });

export const getFeedQuery = (param?: string) => ({
  queryKey: ['feed', param],
  queryFn: async () => {
    const feed = await getGlobalFeed(param);
    // if (!contact) {
    //   throw new Response('', {
    //     status: 404,
    //     statusText: 'Not Found',
    //   });
    // }
    return feed;
  },
});
export const getFeedQuery2 = (param?: string) => ({
  queryKey: ['feed', param],
  queryFn: async () => {
    const feed = await getGlobalFeed(param);
    // if (!contact) {
    //   throw new Response('', {
    //     status: 404,
    //     statusText: 'Not Found',
    //   });
    // }
    return feed;
  },
});
export const getFeedQuery3 = (params: string) => ({
  // queryKey: ['feed', params],
  queryFn: async ({ pageParam = 0 }) => {
    const res = await getGlobalFeed(params, pageParam);
    return res;
  },
  options: {
    getPreviousPageParam: (firstPage: any) => firstPage?.page ?? undefined,
    getNextPageParam: (lastPage: any) => lastPage?.nextPage ?? undefined,
  },
});

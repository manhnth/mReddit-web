import { Hot, New } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostCard } from '../PostCard';
import cn from 'clsx';
import { getGlobalFeed } from '@/lib/feed/feed';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, QueryClient } from 'react-query';

export const Feed = () => {
  const params = useParams();
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['feed', params.sort],
    async ({ pageParam = 1 }) => {
      const res = await getGlobalFeed(params.sort as string, pageParam);
      return res;
    },
    {
      // getPreviousPageParam: (firstPage) => firstPage.page ?? undefined,
      getNextPageParam: (lastPage) => {
        console.log('last page', lastPage);

        return lastPage.nextPage || undefined;
      },
    },
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="max-w-2xl w-full mx-2">
      <div className="pb-2">
        {params?.sort === 'hot' ? 'Hot posts' : 'New posts'}
      </div>
      <div className="bg-primary mb-4 flex p-2">
        <Link to={'../hot'}>
          <Button
            variant="pill"
            className={cn(
              'px-2  py-1 bg-transparent hover:bg-accent-7 text-accent-3',
              params?.sort === 'hot' ? 'text-base !bg-accent-6' : '',
            )}
          >
            <Hot
              className={`${
                params?.sort === 'hot' ? 'fill-accent-1' : 'fill-accent-3'
              }`}
              width={25}
            />
            <p className="text-sm px-1">Hot</p>
          </Button>
        </Link>
        <Link to={'../new'}>
          <Button
            variant="pill"
            className={cn(
              'px-2  py-1 bg-transparent hover:bg-accent-7 text-accent-3',
              params?.sort === 'new' ? 'text-base !bg-accent-6' : '',
            )}
          >
            <New
              className={`${
                params?.sort === 'new' ? 'fill-accent-1' : 'fill-accent-3'
              }`}
              width={25}
            />
            <p className="text-sm px-1">New</p>
          </Button>
        </Link>
      </div>
      {status === 'loading' ? (
        <Loading />
      ) : status === 'error' ? (
        <span>Error: {'who'}</span>
      ) : (
        <>
          {data &&
            data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.feed.map((p, i) => {
                  return <PostCard key={i} {...p} />;
                })}
              </React.Fragment>
            ))}
          <div>
            <div ref={ref} className="flex justify-center py-8">
              {isFetchingNextPage ? (
                <Loading />
              ) : hasNextPage ? (
                'Load More'
              ) : (
                'Nothing more to load!!'
              )}
            </div>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </>
      )}
    </div>
  );
};

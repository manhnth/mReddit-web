import { PostCard } from '@/components/Post/PostCard';
import { Loading } from '@/components/ui/Loading';
import { search } from '@/lib/post';
import React, { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
  const searchParams = useLocation().search;
  const query = new URLSearchParams(searchParams).get('q');

  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery(['search', query], () => search(query as string));

  if (result && result[0]) {
    return (
      <div className="max-w-2xl w-full mx-auto mt-8">
        <div className="p-2">{`result for '${query}'`}</div>
        {result.map((p: any, i: any) => (
          <PostCard key={i} id={p.id} />
        ))}
      </div>
    );
  }

  if (result && !result[0])
    return (
      <div className="max-auto my-32 flex justify-center">
        <span className="text-4xl">{`Not found post with '${query}'`}</span>
      </div>
    );

  return <Loading />;
};

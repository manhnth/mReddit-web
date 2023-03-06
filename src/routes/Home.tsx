import { Feed } from '@/components/Post/PostList';
import { Button } from '@/components/ui/Button';
import React from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <>
      <div className="max-w-5xl w-full mx-auto flex justify-between gap-6 mt-12">
        <Feed />
        <div className="w-full max-w-xs bg-primary mt-8 hidden 2xl:block h-96 px-8 py-16">
          <Link to={'../submit'}>
            <Button variant="pill" className="px-2">
              Create Post
            </Button>
          </Link>
          <Button variant="outline" className="px-2 mt-3">
            Create Community (Ongoing)
          </Button>
        </div>
      </div>
    </>
  );
};

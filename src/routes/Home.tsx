import { Feed } from '@/components/Post/PostList';
import { Button } from '@/components/ui/Button';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <>
      <div className="max-w-5xl w-full mx-auto flex justify-between gap-6 mt-12">
        <Feed />
        <div className="w-full max-w-xs bg-primary mt-8 hidden 2xl:block h-fit pb-10 border border-accent-7">
          <div
            className={`bg-[url('https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png')] bg-cover h-8`}
          >
            {' '}
          </div>
          <div className="-mt-6 flex gap-2 items-center">
            <div
              className={`bg-[url('https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png')] bg-cover w-12 h-20`}
            ></div>
            <div className="mt-8">
              <span className="font-semibold">Home</span>
            </div>
          </div>
          <div className="px-2 text-sm mb-2 mt-3">
            <div>
              Your personal Reddit frontpage. Come here to check in with your
              favorite communities.
            </div>
          </div>
          <hr className="w-11/12 mt-4 mx-auto bg-accent-5" />
          <div className="px-2 mt-6">
            <Link to={'../submit'}>
              <Button variant="pill" className="w-full py-1">
                Create Post
              </Button>
            </Link>
            <Button variant="outline" className="py-1 w-full mt-3">
              Create Community (Ongoing...)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

import React from 'react';
import s from './Loading.module.css';
import cn from 'clsx';

export const Loading: React.FC = ({}) => {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 animate-pulse mt-10">
        <div className="w-8 h-8 bg-accent-2 rounded-full"></div>
        <div className="w-8 h-8 bg-accent-2 rounded-full"></div>
        <div className="w-8 h-8 bg-accent-2 rounded-full"></div>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mt-4">
        <h2 className="text-base text-3xl font-semibold">Loading...</h2>
        <p className="text-center text-base">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    </>
  );
};

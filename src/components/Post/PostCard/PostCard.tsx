import { Button } from '@/components/ui/Button';
import { formatMovementDate, formatNb, truncateText } from '@/utils/util';
import React from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import cn from 'clsx';
import { queryClient } from '@/App';
import { getPostQuery, vote } from '@/lib/post';
import { useMutation, useQuery } from 'react-query';
import { Loading } from '@/components/ui/Loading';

interface PostCardProps {
  id: number;
  // title: string;
  // text: string;
  // subreddit: any;
  // author: any;
  // createAt: string;
  // nbComments: number;
  // point: number;
  // isOwner: boolean;
  // self: string;
  // userUpdoot: any;
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const {
    data: post,
    isFetching,
    isLoading,
  } = useQuery(getPostQuery(`${props.id}`));

  const { mutate: votePost } = useMutation(vote, {
    onSuccess: () => queryClient.invalidateQueries(['post', `${props.id}`]),
  });

  // if (isFetching || isLoading) return <Loading />;

  if (post) {
    const {
      title,
      text,
      subreddit,
      author,
      createAt,
      nbComments,
      point,
      isOwner,
      self,
      userUpdoot,
    } = post;

    return (
      <div className="bg-primary mb-3 flex w-full border border-accent-7 hover:border-accent-5 rounded-sm">
        {/* side vote button for large screen */}
        <div className="hidden lg:block w-fit bg-accent-8 p-2">
          <div className="hidden lg:flex flex-col items-center pt-1">
            <BiUpvote
              size={20}
              className={cn(
                'hover:fill-red hover:cursor-pointer',
                userUpdoot?.value === 1 ? 'fill-red' : '',
              )}
              onClick={() => votePost({ self, value: 1 })}
            />
            <span className="text-xs">{formatNb(point)}</span>
            <BiDownvote
              className={cn(
                'hover:fill-blue hover:cursor-pointer',
                userUpdoot?.value === -1 ? 'fill-blue' : '',
              )}
              onClick={() => votePost({ self, value: -1 })}
              size={20}
            />
          </div>
        </div>
        <div className="w-full p-2">
          {/* header card */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex">
              {subreddit?.name && (
                <span className="font-semibold pr-2">{`r/${subreddit.name}`}</span>
              )}
              <h4 className="text-accent-4 mr-1">Posted by u/{author.name}</h4>
              <p className="text-accent-4">{formatMovementDate(createAt)}</p>
            </div>
            <div>
              {subreddit?.name && (
                <Button variant="pill" className="w-fit px-3 py-1">
                  Join
                </Button>
              )}
            </div>
          </div>
          {/* content */}
          <Link to={`../${self}`}>
            <div className="mt-1 px-">
              <h2 className="font-semibold text-accent-2">
                {truncateText(title)}
              </h2>
              <ReactMarkdown children={truncateText(text, 200)}></ReactMarkdown>
            </div>
          </Link>
          {/* footer card */}
          <div className="flex gap-3 items-center text-xs text-accent-4 mt-3">
            {/*vote button  mobile screen */}
            <div className="flex lg:hidden self-end gap-1">
              <BiUpvote
                size={15}
                className={cn(
                  'hover:fill-red hover:cursor-pointer',
                  userUpdoot?.value === 1 ? 'fill-red' : '',
                )}
                onClick={() => votePost({ self, value: 1 })}
              />
              <span className="text-accent-2 font-semibold">
                {formatNb(point)}
              </span>
              <BiDownvote
                size={15}
                className={cn(
                  'hover:fill-blue hover:cursor-pointer',
                  userUpdoot?.value === -1 ? 'fill-blue' : '',
                )}
                onClick={() => votePost({ self, value: -1 })}
              />
            </div>
            <div className="flex items-center gap-2">
              <FaRegCommentAlt size={15} className="self-end" />
              <Link to={`../${self}`}>
                <div className="w-max">{formatNb(nbComments)} comments</div>
              </Link>
            </div>
            {/* {isOwner && <p>edit</p>} */}
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

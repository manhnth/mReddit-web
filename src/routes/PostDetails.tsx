import { Button } from '@/components/ui/Button';
import { getUserQuery } from '@/lib/auth';
import { deletePost, getPostQuery, vote } from '@/lib/post/post';
import { formatMovementDate, formatNb, truncateText } from '@/utils/util';
import React, { useState } from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useUI } from '@/components/ui/context';
import { queryClient } from '@/App';
import cn from 'clsx';
import { createCmt, deleteCmt } from '@/lib/comment';
import { Spinner } from '@/components/ui/Spinner';

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = getPostQuery(params.postId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

interface PostDetailsData {
  author: { name: string; self: string };
  authorId: number;
  comments?: {
    self: string;
    isOwner: boolean;
    text: string;
    owner: {
      name: string;
      self: string;
    };
  }[];
  createAt: string;
  id: number;
  isOwner: boolean;
  isUpdoot: boolean;
  point: number;
  self: string;
  subreddit: { name: string | null; self: string };
  subredditId: number | null;
  text: string;
  title: string;
  updateAt: string;
  userUpdoot: any;
  voteStatus: number;
  nbComments: number;
}

export const PostDetails: React.FC = (props) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const { openModal, setModalView } = useUI();
  const [cmt, setCmt] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading: isUserLoading } = useQuery(getUserQuery());
  const { mutate: votePost } = useMutation(vote, {
    onSuccess: () => queryClient.invalidateQueries(['post', params.postId]),
  });
  const { mutate: deleteComment } = useMutation(deleteCmt, {
    onSuccess: () => queryClient.invalidateQueries(['post', params.postId]),
  });
  const { mutate: postCmt, isLoading } = useMutation(createCmt, {
    onSuccess: () => queryClient.invalidateQueries(['post', params.postId]),
  });

  const { data } = useQuery({
    ...getPostQuery(params.postId as string),
    enabled: !isUserLoading,
  });

  const post = data as PostDetailsData;
  const {
    author,
    authorId,
    createAt,
    isOwner,
    id,
    isUpdoot,
    point,
    self,
    subreddit,
    subredditId,
    text,
    title,
    updateAt,
    userUpdoot,
    voteStatus,
    comments,
    nbComments,
  } = post;

  const handleEditClick = () => {
    openModal();
    setModalView('EDIT_VIEW');
  };

  const handleRemoveClick = async () => {
    try {
      await deletePost(self);
      navigate('/');
    } catch (error) {}
  };

  function handleCmtChange({ html, text }: any) {
    setCmt(text);
    console.log('handleCmtChange', cmt);
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-primary py-2 px-6 w-full border border-accent-6 rounded-sm">
          <div className="w-full">
            {/* header card */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex">
                {subreddit?.name && (
                  <span className="font-semibold pr-2">{`r/${subreddit.name}`}</span>
                )}
                <h4 className="text-accent-4 mr-1">
                  Posted by u/{author.name}
                </h4>
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
            <div className="mt-1">
              <h2 className="font-semibold text-accent-2 mb-2">{text}</h2>
              <ReactMarkdown children={text}></ReactMarkdown>
            </div>
            {/* footer card */}
            <div className="flex gap-3 items-center text-xs text-accent-4 mt-6">
              {/*vote button  mobile screen */}
              <div className="flex self-end gap-1">
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
                <div className="w-max">
                  {formatNb(nbComments) || '0'} comments
                </div>
              </div>
              {isOwner && (
                <>
                  <div
                    className="flex gap-1 hover:cursor-pointer"
                    onClick={handleEditClick}
                  >
                    <AiOutlineEdit size={15} />
                    <p>edit</p>
                  </div>{' '}
                  <div
                    className="flex gap-1 hover:cursor-pointer"
                    onClick={handleRemoveClick}
                  >
                    <AiOutlineDelete size={15} />
                    <p>remove</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* comment section */}
        <div className="bg-primary mt-3 border border-accent-7">
          <div className="px-10 py-2">
            <div className="my-2">{`comment as`}</div>
            <MdEditor
              name="text"
              // ref={mdEditor}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleCmtChange}
              className="h-48"
            />
            <div className="flex justify-end mt-2">
              <Button
                disabled={!cmt}
                onClick={() => postCmt({ self: self, text: cmt })}
                variant="pill"
                className="px-2 py-1"
              >
                {isLoading ? <Spinner /> : 'Post'}
              </Button>
            </div>
          </div>
          <div>
            {!comments ||
              (!comments[0] && (
                <div className="text-accent-5 flex flex-col items-center py-24">
                  <>
                    <h4>No Comments Yet</h4>
                    <p>Be the first to share what you think!</p>
                  </>
                </div>
              ))}
            {comments &&
              comments.map((c, i) => {
                return (
                  <div className="px-10 py-5" key={i}>
                    <h5 className="text-xs">
                      <span className="font-semibold">{`u/${c.owner.name}`}</span>{' '}
                      said:
                    </h5>
                    {/* <p className="text-sm pl-2">{c.text}</p> */}
                    <ReactMarkdown className="text-xs pl-2 pt-1">
                      {c.text}
                    </ReactMarkdown>
                    {c.isOwner && (
                      <div
                        className="flex gap-1 text-sm hover:cursor-pointer items-center hover:text-red mt-2 mb-1"
                        onClick={() => deleteComment(c.self)}
                      >
                        <AiOutlineDelete size={15} />
                        {' remove'}
                      </div>
                    )}
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

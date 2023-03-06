import { Button } from '@/components/ui/Button';
import { getUserQuery } from '@/lib/auth';
import { deletePost, getPostQuery } from '@/lib/post/post';
import { formatMovementDate, formatNb, truncateText } from '@/utils/util';
import React from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { QueryClient, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import { HtmlType } from 'react-markdown-editor-lite/cjs/editor/preview';
import MarkdownIt from 'markdown-it';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useUI } from '@/components/ui/context';

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
  comment?: any;
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
  updoots: any;
  voteStatus: number;
  nbComments: number;
}

export const PostDetails: React.FC = (props) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const { openModal, setModalView } = useUI();
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading: isUserLoading } = useQuery(getUserQuery());

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
    updoots,
    voteStatus,
    comment,
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
              <h2 className="font-semibold text-accent-2">
                {truncateText(title)}
              </h2>
              <ReactMarkdown children={truncateText(text, 200)}></ReactMarkdown>
            </div>
            {/* footer card */}
            <div className="flex gap-3 items-center text-xs text-accent-4 mt-6">
              {/*vote button  mobile screen */}
              <div className="flex self-end gap-1">
                <BiUpvote
                  size={15}
                  className="hover:fill-red hover:cursor-pointer"
                />
                <span className="text-accent-2 font-semibold">
                  {formatNb(point)}
                </span>
                <BiDownvote
                  size={15}
                  className="hover:cursor-pointer hover:fill-blue"
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
              // onChange={handleEditorChange}
              className="h-48"
            />
          </div>
          <div className="py-24">
            <div className="text-accent-5 flex flex-col items-center">
              {!comment[0] && (
                <>
                  <h4>No Comments Yet</h4>
                  <p>Be the first to share what you think!</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

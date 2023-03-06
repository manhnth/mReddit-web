import { queryClient } from '@/App';
import { Button } from '@/components/ui/Button';
import { useUI } from '@/components/ui/context';
import { getPostQuery, updatePost } from '@/lib/post/post';
import { PostData } from '@/lib/post/type';
import MarkdownIt from 'markdown-it';
import React, { ChangeEvent, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { useMutation, useQuery } from 'react-query';
import { Form, useNavigate, useParams } from 'react-router-dom';

export const EditView: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { closeModal } = useUI();
  const { data: postData1 } = useQuery(getPostQuery(params.postId as string));

  const initialPostState = {
    title: postData1.title,
    text: postData1.text,
  };
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const mdEditor = React.useRef<MdEditor>(null);
  const [postData, setPostData] = useState<PostData>(initialPostState);

  const handleEditorChange = ({ html, text }: any) => {
    const newValue = text.replace(/\d/g, '');
    setPostData({
      ...postData,
      text: newValue,
    });
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate } = useMutation(updatePost, {
    onSuccess: () => {
      navigate(postData1.self);
      closeModal();
      queryClient.invalidateQueries(['post', params.postId]);
    },
  });

  return (
    <div className="p-6 max-w-4xl bg-primary border border-accent-7">
      <div>Edit post</div>
      <Form
        method="post"
        onSubmit={(event) => {
          // eslint-disable-next-line no-restricted-globals
          // if (!confirm('Please confirm you want to delete this record.')) {
          // }
          event.preventDefault();
        }}
      >
        <div className="my-3">
          <input
            value={postData.title}
            onChange={(e) => handleTitleChange(e)}
            type="text"
            placeholder="Title"
            name="title"
            className="px-2 py-1 border w-full border-accent-7 bg-transparent hover:border-accent-3"
          />
        </div>
        <MdEditor
          value={postData.text}
          name="text"
          ref={mdEditor}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          className="h-80"
        />
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            disabled={postData.title === '' || postData.text === ''}
            variant="pill"
            className="px-3 py-1 bg-secondary"
            onClick={() => mutate({ self: postData1.self, postData: postData })}
          >
            Edit
          </Button>
        </div>
      </Form>
    </div>
  );
};

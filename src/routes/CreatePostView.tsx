import React, { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import { QueryClient, useMutation } from 'react-query';
import { Button } from '@/components/ui/Button';
import { Form, redirect } from 'react-router-dom';
import { createPost } from '@/lib/post/post';

import MarkdownIt from 'markdown-it';
import ReactMarkdown from 'react-markdown';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { PostData } from '@/lib/post/type';

interface CreatePostViewProps {
  // fn: () => void;
}

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: any) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as PostData;

    const createdPost = await createPost(data);

    queryClient.invalidateQueries({ queryKey: [''] });
    return redirect(`/${createdPost.self}`);
  };

export const CreatePostView: React.FC<CreatePostViewProps> = ({}) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const mdEditor = React.useRef<MdEditor>(null);
  const [text, setText] = useState<any>('');

  // const handleClick = () => {
  //   if (mdEditor.current) {
  //     alert(mdEditor.current.getMdValue());
  //   }
  // };

  const handleEditorChange = ({ html, text }: any) => {
    const newValue = text.replace(/\d/g, '');
    setText({
      newValue,
    });
  };

  return (
    <div className="w-full h-full">
      <div className="mx-auto w-11/12 lg:w-1/2 mt-8">
        <h1>Create a post</h1>
        <hr className="my-6 border-accent-3" />
        <Form
          method="post"
          onSubmit={(event) => {
            // eslint-disable-next-line no-restricted-globals
            // if (!confirm('Please confirm you want to delete this record.')) {
            // }
            // event.preventDefault();
          }}
        >
          <div className="my-3">
            <input
              required
              type="text"
              placeholder="Title"
              name="title"
              className="px-2 py-1 border w-full border-accent-7 bg-primary hover:border-accent-3"
            />
          </div>
          <MdEditor
            name="text"
            ref={mdEditor}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            className="h-80"
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={!text}
              variant="pill"
              className="px-3 py-1 bg-secondary"
            >
              Post
            </Button>
          </div>
        </Form>
      </div>
      {/* <ReactMarkdown children="![](https://i.mydramalist.com/qR8x0_5_c.jpg)"></ReactMarkdown> */}
    </div>
  );
};

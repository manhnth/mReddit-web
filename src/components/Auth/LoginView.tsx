import React from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '../common/InputField';
import { Button } from '../ui/Button';
import redditLogo from '@/assets/reddit2.png';
import { useUI } from '../ui/context';
import { useMutation } from 'react-query';
import { Spinner } from '../ui/Spinner';
import { login } from '@/lib/auth/auth';
import { queryClient } from '@/App';
import { setTokens } from '@/utils/token';
import { useNavigate } from 'react-router-dom';

export const LoginView: React.FC = ({}) => {
  const { setModalView, closeModal, openModal } = useUI();
  const navigate = useNavigate();
  const { error, isLoading, mutate } = useMutation(login, {
    onSuccess: async (data) => {
      setTokens(data.tokens);
      Promise.all([
        // queryClient.invalidateQueries({ queryKey: ['user'] }),
        queryClient.invalidateQueries({ queryKey: ['feed'] }),
      ]);
      setTimeout(() => {
        closeModal();
      }, 1000);
      navigate('/');
    },
  });

  return (
    <div className="max-w-xs w-screen pt-4 pb-6 px-8">
      <div className="flex justify-center flex-col items-center gap-8">
        <img
          src={redditLogo}
          className="logo reddit"
          alt="Reddit logo"
          width={'45px'}
        />
        <h1 className="font-semibold font-sans text-xl">Log In</h1>
        <div className="flex flex-col text-xs w-fit p-1 text-green border border-green">
          <h4>test account</h4>
          <p>user name: test</p>
          <p>password: 123456</p>
        </div>
      </div>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {() => (
          <Form className="flex flex-col mt-4 w-full">
            <InputField
              label="Username"
              name="username"
              type={'text'}
              required
            />
            <InputField
              label="Password"
              name="password"
              type={'password'}
              required
            />
            {error ? (
              <div className="font-thin text-red mt-2">
                {(error as any).response.data.message}
              </div>
            ) : null}
            <div className="flex gap-1 text-sm mb-8 mt-6">
              Forget your
              <Button variant="link">username</Button> or
              <Button
                onClick={() => setModalView('FORGOT_VIEW')}
                variant="link"
              >
                password
              </Button>{' '}
              ?
            </div>
            <Button
              variant="pill"
              disabled={isLoading}
              className="py-2 text-sm"
            >
              {isLoading ? <Spinner /> : 'Log In'}
            </Button>
            <div className="flex gap-1 text-sm mt-4">
              New to Reddit?
              <Button
                type="button"
                onClick={() => {
                  openModal();
                  setModalView('SIGNUP_VIEW');
                }}
                variant="link"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

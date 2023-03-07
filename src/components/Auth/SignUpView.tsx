import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../common/InputField';
import { Button } from '../ui/Button';
import redditLogo from '@/assets/reddit2.png';
import { useUI } from '../ui/context';
import { useMutation } from 'react-query';
import { Spinner } from '../ui/Spinner';
import { signUp } from '@/lib/auth/auth';
import { queryClient } from '@/App';
import { setTokens } from '@/utils/token';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const SignUpView: React.FC = () => {
  const { setModalView, closeModal } = useUI();
  const { isLoading, mutate, error } = useMutation(signUp, {
    onSuccess: (data) => {
      setTokens(data.tokens);
      queryClient.invalidateQueries('user');
      setTimeout(() => closeModal(), 1000);
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
        <h1 className="font-semibold font-sans text-xl">Sign Up</h1>
      </div>

      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {() => (
          <Form className="flex flex-col mt-4 w-full">
            <InputField label="Username" name="username" type={'text'} />
            <InputField label="Email" name="email" type={'email'} />
            <InputField label="Password" name="password" type={'password'} />
            {error ? (
              <div className="font-thin text-red mt-2">
                {(error as any).response.data.message}
              </div>
            ) : null}
            <Button
              variant="pill"
              disabled={isLoading}
              className="py-2 text-sm mt-6"
            >
              {isLoading ? <Spinner /> : 'Sign Up'}
            </Button>
            <div className="flex gap-1 text-sm mt-4">
              Already a redditor?
              <Button onClick={() => setModalView('LOGIN_VIEW')} variant="link">
                Log In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

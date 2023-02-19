import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../common/InputField';
import { Button } from '../ui/Button';
import redditLogo from '@/assets/reddit2.png';
import { useUI } from '../ui/context';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface LoginViewProps {}

export const LoginView: React.FC<LoginViewProps> = ({}) => {
  const { setModalView } = useUI();

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
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col mt-4 w-full">
            <InputField label="Username" name="email" />
            <InputField label="Password" name="password" />
            <div className="flex gap-1 text-sm mb-6">
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
              disabled={isSubmitting}
              className="py-2 text-sm"
            >
              Log In
            </Button>
            <div className="flex gap-1 text-sm mt-4">
              New to Reddit?
              <Button
                onClick={() => setModalView('SIGNUP_VIEW')}
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

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../common/InputField';
import { Button } from '../ui/Button';
import redditLogo from '@/assets/reddit.png';
import { useUI } from '../ui/context';

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

interface LoginViewProps {}

export const ForgotView: React.FC<LoginViewProps> = ({}) => {
  const { setModalView } = useUI();

  return (
    <div className="max-w-xs w-screen pt-4 pb-6 px-8">
      <div className="flex justify-center flex-col items-center gap-8">
        <a href="" className="">
          <img
            src={redditLogo}
            className="logo reddit"
            alt="Reddit logo"
            width={'45px'}
          />
        </a>
        <h1 className="font-semibold font-sans text-xl">Reset your password</h1>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={ForgotSchema}
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
            <Button
              variant="pill"
              disabled={isSubmitting}
              className="py-2 text-sm"
            >
              Email me
            </Button>
            <div className="flex gap-1 text-sm mt-4">
              <Button onClick={() => setModalView('LOGIN_VIEW')} variant="link">
                Log In
              </Button>{' '}
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

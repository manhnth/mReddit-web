import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../common/InputField';
import { Button } from '../ui/Button';
import redditLogo from '@/assets/reddit2.png';
import { useUI } from '../ui/context';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface LoginViewProps {}

export const SignUpView: React.FC<LoginViewProps> = ({}) => {
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
        <h1 className="font-semibold font-sans text-xl">Sign Up</h1>
      </div>

      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col mt-4 w-full">
            {/* <Field as="input" type="email" name="email" placeholder="email" /> */}
            {/* <ErrorMessage name="email" component="div" /> */}
            <InputField label="Username" name="email" />
            <InputField label="Username" name="username" />
            <InputField label="Password" name="password" />
            <Button
              variant="pill"
              disabled={isSubmitting}
              className="py-2 text-sm"
            >
              Sign Up
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

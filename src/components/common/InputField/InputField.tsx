import React, { InputHTMLAttributes } from 'react';
import { useField, Field, ErrorMessage } from 'formik';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error, touched }] = useField(props);

  return (
    <>
      <div className="relative z-0 w-full mt-5 group">
        <Field
          {...props}
          name={props.name}
          id="floating_email"
          className="block py-2 px-0 w-full text-sm text-accent-2 bg-transparent border-0 border-b-2 border-accent-5 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-accent-3 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          {props.label}
        </label>
        {/* {error && touched ? (
         ) : null} */}
        <ErrorMessage name={props.name} component="div" className="text-red" />
      </div>
    </>
  );
};

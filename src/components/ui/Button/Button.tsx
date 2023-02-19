import {
  ButtonHTMLAttributes,
  forwardRef,
  JSXElementConstructor,
  useRef,
} from 'react';
import cn from 'clsx';
import s from './Button.module.css';
import { LoadingSpinner } from '../LoadingSpinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'simple' | 'outline' | 'link' | 'pill';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

// eslint-disable-next-line react/display-name
export const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'simple',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.simple]: variant === 'simple',
      [s.outline]: variant === 'outline',
      [s.pill]: variant === 'pill',
      [s.link]: variant === 'link',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      // ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingSpinner />
        </i>
      )}
    </Component>
  );
});

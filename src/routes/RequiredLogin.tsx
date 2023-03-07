import { LoginView } from '@/components/Auth';
import { useUI } from '@/components/ui/context';
import React, { useEffect } from 'react';

interface RequiredLoginProps {}

export const RequiredLogin: React.FC<RequiredLoginProps> = ({}) => {
  const { openModal, setModalView, displayModal } = useUI();

  useEffect(() => {
    openModal();
    setModalView('LOGIN_VIEW');
  }, []);

  return <div className=""></div>;
};

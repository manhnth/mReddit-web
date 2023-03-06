import { logOut } from '@/lib/auth';
import React from 'react';

interface SignOutButtonProps {}

export const SignOutButton: React.FC<SignOutButtonProps> = () => {
  const handleSignOut = () => {
    logOut();
    window.location.reload();
  };
  return (
    <>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </>
  );
};

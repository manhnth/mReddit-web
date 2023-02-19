import React from 'react';
import redditLogo from '@/assets/reddit2.png';
import { Reddit } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useUI } from '@/components/ui/context';
import { SearchBar } from '@/components/common/SearchBar';
import { UserNav } from '@/components/common/UserDropdown';
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { openModal, setModalView } = useUI();

  const handleClickAuth = () => {
    openModal();
    setModalView('LOGIN_VIEW');
  };

  return (
    <header className="flex w-full px-2 lg:px-8 py-2 items-center bg-primary">
      <a href="" className="flex items-center">
        <img
          src={redditLogo}
          className="logo reddit"
          alt="Reddit logo"
          width={'45px'}
        />
        <Reddit width={'80px'} className="fill-accent-3 hidden md:block" />
      </a>
      {/* for mobile */}
      {/* <div className="md:hidden rounded-full bg-accent-2 p-1 mx-2">
        <Search />
      </div> */}
      {/* for large screen */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="px-4 mx-auto">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={handleClickAuth}
          variant="pill"
          className="px-4 py-2 leading-none hidden sm:block w-max"
        >
          Log In
        </Button>
        <UserNav />
      </div>
    </header>
  );
};

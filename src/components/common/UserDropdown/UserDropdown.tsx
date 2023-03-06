import { DarkMode, Expand, Person } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { getUserQuery, logOut } from '@/lib/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToggleTheme } from '../ToggleThemeButton';
import s from './UserDropdown.module.css';

interface UserNavProps {}

export const UserNav: React.FC<UserNavProps> = ({}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: user } = useQuery(getUserQuery());
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const clickLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    logOut();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDisplayDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left border-0">
      <div>
        <button
          onClick={toggleDropdown}
          className={s.userBox}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <div className="flex items-center bg-transparent">
            <Person className="fill-accent-5" width={'25px'} />
            <Expand className="fill-accent-5" width={'20px'} />
          </div>
        </button>
      </div>
      {/* drop down list */}
      {displayDropdown && (
        <div ref={dropdownRef} className={s.list} role="menu" tabIndex={-1}>
          <div className="py-1" role="none">
            <Button
              variant="outline"
              className="text-sm font-semibold flex gap-2 items-center border-none"
            >
              <>
                <span>
                  <DarkMode className="fill-accent-5" width={'20px'} />
                </span>
                <ToggleTheme />
              </>
            </Button>
            {user && (
              <Button
                onClick={(e) => clickLogout(e)}
                variant="outline"
                className="text-sm font-semibold flex gap-2 items-center border-none"
              >
                <span>
                  <DarkMode className="fill-accent-5" width={'20px'} />
                </span>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import { Expand, Person } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { DROPDOWN_MENU } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';
import s from './UserDropdown.module.css';

interface UserNavProps {}

export const UserNav: React.FC<UserNavProps> = ({}) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

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
      {displayDropdown && (
        <div
          ref={dropdownRef}
          className={s.list}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {DROPDOWN_MENU.map((option, i) => (
              <Button
                key={i}
                variant="outline"
                className="text-sm font-semibold flex gap-2 items-center"
              >
                <>
                  <span>
                    <option.icon className="fill-accent-5" width={'20px'} />
                  </span>
                  {<option.label />}
                </>
              </Button>
            ))}
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="block px-1 py-2 text-left text-sm"
                role="menuitem"
                tabIndex={1}
                id="menu-item-3"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

'use client'
import {FC, ReactNode} from 'react'
import {logout} from "@/actions/logout";

interface ILogoutButtonProps {
  children: ReactNode;
}

const LogoutButton: FC<ILogoutButtonProps> = ({children}) => {
  const onClick = () => {
    logout()
  }
  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
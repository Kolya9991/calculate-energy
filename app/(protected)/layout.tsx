import {FC, ReactNode} from 'react'
import Navbar from "@/components/settings-profile/Navbar";
import {Metadata} from "next";

interface IProtectedLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Єко плюс',
};

const ProtectedLayout: FC<IProtectedLayoutProps> = ({children}) => {
  return (
    <div
      className='h-full w-full flex flex-col gap-y-10 items-center'>
      <Navbar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;

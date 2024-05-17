import {FC, ReactNode} from 'react'
import Navbar from "@/components/settings-profile/Navbar";

interface IProtectedLayoutProps {
  children: ReactNode
}

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

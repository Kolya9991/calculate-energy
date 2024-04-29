import {FC, ReactNode} from 'react'
import Navbar from "@/components/settings-profile/Navbar";

interface IProtectedLayoutProps {
  children: ReactNode
}

const ProtectedLayout: FC<IProtectedLayoutProps> = ({children}) => {
  return (
    <div
      className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-b from-sky-400 via-sky-500 to-blue-800'>
      <Navbar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;
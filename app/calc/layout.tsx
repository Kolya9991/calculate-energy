import {FC, ReactNode} from "react";
import Navbar from "@/components/settings-profile/Navbar";
import {Metadata} from "next";
interface ILayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Єко плюс',
};

const Layout: FC<ILayoutProps> = ({children}) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;

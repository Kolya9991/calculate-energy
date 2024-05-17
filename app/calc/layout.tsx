import {FC, ReactNode} from "react";
import Navbar from "@/components/settings-profile/Navbar";
interface ILayoutProps {
  children: ReactNode
}
const Layout: FC<ILayoutProps> = ({children}) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;

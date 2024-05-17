import Navbar from "@/components/settings-profile/Navbar";
import {FC, ReactNode} from "react";
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

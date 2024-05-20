import {ReactNode} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Єко плюс',
};

const AuthLayout = ({children}:{children: ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center'>
      {children}
    </div>
  );
};

export default AuthLayout;

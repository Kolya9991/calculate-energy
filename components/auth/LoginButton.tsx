'use client'
import {FC, ReactNode} from "react";
import {useRouter} from "next/navigation";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form/LoginForm";

interface ILoginButtonProps {
  children?: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}
const LoginButton: FC<ILoginButtonProps> = ({children, asChild, mode = 'redirect'}) => {
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/login")
  }
  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm/>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  );
};

export default LoginButton;
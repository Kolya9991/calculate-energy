import {CheckCircledIcon} from "@radix-ui/react-icons"
import {FC} from "react";

interface IFormSuccessProps {
  message?: string
}

const FormSuccess: FC<IFormSuccessProps> = ({message}) => {
  if (!message) return null;

  return (
    <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <CheckCircledIcon className='h-4 w-4'/>
      <p className='m-0'>{message}</p>
    </div>
  );
};

export default FormSuccess
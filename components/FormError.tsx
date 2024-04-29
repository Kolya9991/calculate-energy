import {ExclamationTriangleIcon} from "@radix-ui/react-icons"
import {FC} from "react";

interface IFormErrorProps {
  message?: string
}

const FormError: FC<IFormErrorProps> = ({message}) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <ExclamationTriangleIcon className='h-4 w-4'/>
      <p className='m-0'>{message}</p>
    </div>
  );
};

export default FormError
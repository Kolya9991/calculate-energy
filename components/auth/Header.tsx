import {FC} from "react";

interface IHeaderProps {
  label: string;
}

const Header: FC<IHeaderProps> = ({label}) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
};

export default Header;
'use client';
import {FC} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface IBackButtonProps {
  label: string;
  href: string;
}
const BackButton: FC<IBackButtonProps> = ({label, href}) => {
  return (
    <Button variant="link" className='font-normal w-full' size='sm'>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
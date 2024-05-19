import Link from "next/link";
import {Button} from "@/components/ui/button";

const EmptyCalculateData = () => {
  return (
    <div className='flex justify-center items-center'>
      <Button variant='link' aria-label='Перейти до калькуляції енергоефективності'>
        <Link href='/calc'>Перейти до калькуляції енергоефективності</Link>
      </Button>
    </div>
  );
};

export default EmptyCalculateData;

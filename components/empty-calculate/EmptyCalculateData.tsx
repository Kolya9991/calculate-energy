import Link from "next/link";

const EmptyCalculateData = () => {
  return (
    <div className='flex justify-center items-center'>
      <Link href='/calc'>Перейти до калькуляції енергоефективності</Link>
    </div>
  );
};

export default EmptyCalculateData;

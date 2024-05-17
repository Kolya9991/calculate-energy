'use client';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import UserButton from "@/components/auth/userButton";
import {useCurrentUser} from "@/hooks/useCurrentUser";

const Navbar = () => {
  const pathname = usePathname()
  const user = useCurrentUser()
  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-md'>
      <div className='flex gap-x-2'>
        {user?.role === 'ADMIN' ? <Button asChild variant={pathname === "/admin" ? 'default' : 'outline'}>
          <Link href='/admin'>Admin</Link>
        </Button> : null}
        <Button asChild variant={pathname === "/client" ? 'default' : 'outline'}>
          <Link href='/client'>Client</Link>
        </Button>
        <Button asChild variant={pathname === "/calculation-result" ? 'default' : 'outline'}>
          <Link href='/calculation-result'>calculation-result</Link>
        </Button>
        <Button asChild variant={pathname === "/calc" ? 'default' : 'outline'}>
          <Link href='/calc'>Калькулятор енергоефективності</Link>
        </Button>
        <Button asChild variant={pathname === "/faq" ? 'default' : 'outline'}>
          <Link href='/faq'>FAQ</Link>
        </Button>
        <Button asChild variant={pathname === "/about-us" ? 'default' : 'outline'}>
          <Link href='/about-us'>Про нас</Link>
        </Button>
        <Button asChild variant={pathname === "/settings" ? 'default' : 'outline'}>
          <Link href='/settings'>Settings</Link>
        </Button>
      </div>
      <UserButton/>
    </nav>
  );
};

export default Navbar;

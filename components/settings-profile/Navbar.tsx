'use client';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import UserButton from "@/components/auth/userButton";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"; // Adjust the import based on your file structure
import {useState} from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";

const Navbar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const NavContent = () => (
    <div className='flex gap-x-2 flex-col mt-4 gap-y-4 md:flex-row md:gap-y-0 md:mt-0'>
      {user?.role === 'ADMIN' ? (
        <Button asChild variant={pathname === "/admin" ? 'default' : 'outline'}>
          <Link href='/admin' onClick={handleClose}>Адмін</Link>
        </Button>
      ) : null}
      <Button asChild variant={pathname === "/client" ? 'default' : 'outline'}>
        <Link href='/client' onClick={handleClose}>Особиста сторінка</Link>
      </Button>
      <Button asChild variant={pathname === "/contact-us" ? 'default' : 'outline'}>
        <Link href='/contact-us' onClick={handleClose}>Контакна форма</Link>
      </Button>
      <Button asChild variant={pathname === "/calc" ? 'default' : 'outline'}>
        <Link href='/calc' onClick={handleClose}>Калькулятор енергоефективності</Link>
      </Button>
      <Button asChild variant={pathname === "/faq" ? 'default' : 'outline'}>
        <Link href='/faq' onClick={handleClose}>FAQ</Link>
      </Button>
      <Button asChild variant={pathname === "/about-us" ? 'default' : 'outline'}>
        <Link href='/about-us' onClick={handleClose}>Про нас</Link>
      </Button>
      <Button asChild variant={pathname === "/settings" ? 'default' : 'outline'}>
        <Link href='/settings' onClick={handleClose}>Налаштування</Link>
      </Button>
    </div>
  );

  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-md  overflow-x-auto min-h-[75px]'>
      <div className='hidden md:flex'>
        <NavContent/>
      </div>
      <div className='md:hidden flex-col'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button onClick={() => setOpen(true)} className='p-2'>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round" className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <NavContent/>
          </SheetContent>
        </Sheet>
      </div>
      <ThemeToggle />
      <UserButton/>
    </nav>
  );
};

export default Navbar;

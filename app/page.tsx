import {Button} from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-gradient-to-b from-sky-400 via-sky-500 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1 className='text-6xl font-semibold text-white drop-shadow-md'>🔐Auth</h1>
          <p className='text-white text-lg'>A simple authentication service</p>
        <div>
          {/*TODO: use with mode='modal' asChild for show as Modal}*/}
          <LoginButton>
            <Button variant="secondary" size='lg'>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

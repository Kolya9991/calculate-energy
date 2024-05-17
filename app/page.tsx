import LoginForm from "@/components/auth/login-form/LoginForm";

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <div className='space-y-6 text-center'>
        <div>
          {/*TODO: use with mode='modal' asChild for show as Modal}*/}
          <LoginForm/>
        </div>
      </div>
    </main>
  );
}

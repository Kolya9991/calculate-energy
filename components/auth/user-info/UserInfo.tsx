import {FC} from 'react'
import {ExtendedUser} from "@/next-auth";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface IUserInfoProps {
  user?: ExtendedUser
  label: string;
}

const UserInfo: FC<IUserInfoProps> = ({label, user}) => {
  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader className='text-2xl font-semibold text-center'>
        <p>{label}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>ID</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.id}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Ім&apos;я</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.name}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Email</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.email}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Роль</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.role}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>2FA</p>
          <Badge
            variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>{user?.isTwoFactorEnabled ? 'Є' : "Нема"}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
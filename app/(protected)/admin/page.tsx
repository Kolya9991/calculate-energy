'use client'
import {useCurrentRole} from "@/hooks/useCurrentRole";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import RoleGate from "@/components/auth/role-gate/RoleGate";
import FormSuccess from "@/components/FormSuccess";
import {UserRole} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {admin} from "@/actions/admin";

const AdminPage = () => {
  const onServerAction = () => {
    admin()
      .then((data)=>{
        if (data.error){
          toast.error(data.error)
        }
        if(data.success){
          toast.success(data.success)
        }
      })
  }
  const onApiRouteClick = () => {
    fetch('/api/admin')
      .then((res)=> {
        if (res.ok){
          toast.success('Allowed API Route')
        }else {
          toast.error('Forbidden API Route')
        }
      })
  }
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          ADMIN
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='Ви маєте право на перегляд цього вмісту'/>
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
            <p className='text-sm font-medium'>Admin-only Route</p>
            <Button onClick={onApiRouteClick}>
              Click to test
            </Button>
          </div>
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
            <p className='text-sm font-medium'>Admin-only Server Action</p>
            <Button onClick={onServerAction}>
              Click to test
            </Button>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
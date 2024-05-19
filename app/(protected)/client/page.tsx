'use client'
import UserInfo from "@/components/auth/user-info/UserInfo";
import {useCurrentUser} from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser()
  return (

    <UserInfo label='' user={user}/>

  );
};

export default ClientPage;

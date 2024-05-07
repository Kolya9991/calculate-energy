'use client'
import UserInfo from "@/components/auth/user-info/UserInfo";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import ExportTemplate from "@/components/export-template/ExportTemplate";

const ClientPage = () => {
  const user = useCurrentUser()
  return (
    <>
      <UserInfo label='client compoent' user={user}/>
      <ExportTemplate/>
    </>
  );
};

export default ClientPage;

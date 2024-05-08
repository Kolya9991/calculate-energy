'use client'
import UserInfo from "@/components/auth/user-info/UserInfo";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import ExportTemplate from "@/components/export-template/ExportTemplate";
import EnergyCalculator from "@/components/energy-calculate/EnergyCalculator";
import CalcForm from "@/components/calc-form/CalcForm";

const ClientPage = () => {
  const user = useCurrentUser()
  return (
    <>
      <UserInfo label='client compoent' user={user}/>
      <ExportTemplate/>
      <EnergyCalculator/>
      <CalcForm/>
    </>
  );
};

export default ClientPage;

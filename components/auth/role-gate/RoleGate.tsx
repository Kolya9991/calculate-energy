'use client'
import {FC, ReactNode} from 'react'
import {UserRole} from "@prisma/client";
import {useCurrentRole} from "@/hooks/useCurrentRole";
import FormError from "@/components/FormError";

interface IRoleGateProps {
  children: ReactNode;
  allowedRole: UserRole;
}

const RoleGate: FC<IRoleGateProps> = ({children, allowedRole}) => {
  const role = useCurrentRole()
  if(role !== allowedRole) {
    return (
      <FormError message="Ви не маєте дозволу на перегляд" />
    )
  }
  return (
    <div>
      {children}
    </div>
  );
};

export default RoleGate;
import {FC, useEffect, useState} from 'react'
import {ExtendedUser} from "@/next-auth";
import * as z from "zod";
import {CalculateDevices} from "@/schemas";
import {getCalculate} from "@/actions/calculate";

interface IUserInfoProps {
  user?: ExtendedUser
  label: string;
}

const CalculateSchema = z.array(CalculateDevices);

const UserInfo: FC<IUserInfoProps> = ({label, user}) => {
  const [calculate, setCalculate] = useState<z.infer<typeof CalculateSchema>>([])
  useEffect(() => {
    getCalculate(user?.id)
      .then((data)=>{
        setCalculate(data)
      })
      .catch((error)=>{
        console.log('Error fetching calculate data', error)
      })
  }, []);
  return (
    <div>
      {JSON.stringify(calculate)}
    </div>
  );
};

export default UserInfo;

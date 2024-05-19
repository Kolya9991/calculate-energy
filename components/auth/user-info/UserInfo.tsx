'use client'
import {FC, useEffect, useState} from 'react'
import {ExtendedUser} from "@/next-auth";
import * as z from "zod";
import {CalculateDevices} from "@/schemas";
import {getCalculate} from "@/actions/calculate";
import EmptyCalculateData from "@/components/empty-calculate/EmptyCalculateData";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {Skeleton} from "@/components/ui/skeleton";

interface IUserInfoProps {
  user?: ExtendedUser
  label: string;
}

const CalculateSchema = z.array(CalculateDevices);

const UserInfo: FC<IUserInfoProps> = ({label, user}) => {
  const [calculate, setCalculate] = useState<z.infer<typeof CalculateSchema>>([])
  useEffect(() => {
    getCalculate(user?.id)
      .then((data) => {
        setCalculate(data)
      })
      .catch((error) => {
        console.log('Error fetching calculate data', error)
      })
  }, []);

  if (!calculate) {
    return <Skeleton className="min-w-[600px] h-[20px] rounded-full" />
  }

  const headers = [
    'Назва приладу',
    'Кількість',
    'Кількість годин роботи',
    'Період',
    'кВт',
    'кВт в місяць',
  ]
  return (
    <>
      {calculate && calculate.length ?
        <div className='overflow-x-auto w-full'>
          <Table className='bg-white min-w-[600px] mx-auto rounded-xl h-full'>
            <TableHeader>
              <TableRow>
                <TableHead><Checkbox/></TableHead>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className='text-sm text-gray-600'>
              {calculate?.map((item, index) => (
                <TableRow key={index} className='bg-white'>
                  <TableCell><Checkbox/></TableCell>
                  <TableCell>{item.nameDevice}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{item.hoursWork}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>{item.kw}</TableCell>
                  <TableCell>{item.kwMonth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> : <EmptyCalculateData/>
      }
    </>
  );
};

export default UserInfo;

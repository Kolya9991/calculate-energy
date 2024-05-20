'use client'
import * as z from 'zod';
import {useEffect, useState} from 'react';
import {ContactUsSchema} from "@/schemas";
import {getAllContactUs} from "@/actions/get-all-contact-us";
import {Skeleton} from "@/components/ui/skeleton";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";

const GetAllContactUs = () => {
  const [data, setData] = useState<z.infer<typeof ContactUsSchema>[]>();
  useEffect(() => {
    getAllContactUs()
      .then((items) => {
        setData(items)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, []);

  const headers = [
    "Ім'я користувача",
    'Email',
    'Номер телефону',
    'Коментар',
  ];

  if (!data) {
    return <Skeleton className="w-[600px] h-[20px] rounded-full"/>
  }

  return (
    <div className="overflow-x-auto w-full">
      <Table className="bg-white min-w-[600px] mx-auto rounded-xl h-full">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm text-gray-600">
          {data?.map((item, index) => (
            <TableRow key={index} className="bg-white">
              <TableCell>{item.name}</TableCell>
              <TableCell><Link href={`mailto:${item.email}`}>{item.email}</Link></TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllContactUs;

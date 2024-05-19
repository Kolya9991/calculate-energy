'use client'
import {FC, useEffect, useState} from 'react'
import {ExtendedUser} from "@/next-auth";
import * as z from "zod";
import {CalculateDevices} from "@/schemas";
import {getCalculate} from "@/actions/calculate";
import EmptyCalculateData from "@/components/empty-calculate/EmptyCalculateData";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import SkeletonTable from "@/components/auth/user-info/skeleton-table/SkeletonTable";
import ExportToXLSXButton from "@/components/export-to-xlsx/ExportToXLSXButton";
import ExportToDocxButton from "@/components/export-to-docx/ExportToDocxButton";
import ExportToPdfButton from "@/components/export-to-pdf/ExportToPDFButton";

interface IUserInfoProps {
  user?: ExtendedUser
}

const CalculateSchema = z.array(CalculateDevices);

const UserInfo: FC<IUserInfoProps> = ({ user}) => {
  const [calculate, setCalculate] = useState<z.infer<typeof CalculateSchema>>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    getCalculate(user?.id)
      .then((data) => {
        setCalculate(data);
      })
      .catch((error) => {
        console.log('Error fetching calculate data', error);
      });
  }, []);

  useEffect(() => {
    setIsAllSelected(selectedItems.length === calculate.length);
  }, [selectedItems, calculate]);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      const allItems = calculate.map((_, index) => index);
      setSelectedItems(allItems);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const getSelectedData = () => {
    return selectedItems.map(index => calculate[index]);
  };

  if (!calculate.length) {
    return (
      <SkeletonTable />
    );
  }

  const headers = [
    'Назва приладу',
    'Кількість',
    'Кількість годин роботи',
    'Період',
    'кВт',
    'кВт в місяць',
  ];

  return (
    <>
      {calculate ? (
        <div className='overflow-x-auto w-full'>
          <Table className='bg-white min-w-[600px] mx-auto rounded-xl h-full'>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll}/>
                </TableHead>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className='text-sm text-gray-600'>
              {calculate.map((item, index) => (
                <TableRow key={index} className='bg-white'>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onCheckedChange={() => handleSelectItem(index)}
                    />
                  </TableCell>
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

          <div className='flex gap-2 mt-8 justify-center flex-wrap'>
            <ExportToXLSXButton data={getSelectedData()} />
            <ExportToDocxButton data={getSelectedData()} />
            <ExportToPdfButton data={getSelectedData()} />
          </div>
        </div>
      ) : <EmptyCalculateData/>}
    </>
  );
};

export default UserInfo;

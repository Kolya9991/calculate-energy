import * as z from 'zod';
import {useEffect, useState} from 'react'
import {getDevices} from "@/actions/getDevices";
import {DeviceSchema} from "@/schemas";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import ActionWithCell from "@/components/action-with-cell/ActionWithCell";

const DevicesSchema = z.array(DeviceSchema);

const AllDevice = () => {
  const [data, setData] = useState<z.infer<typeof DevicesSchema>>();

  useEffect(() => {
    getDevices().then((devices) => {
      setData(devices);
    }).catch((error) => {
      console.error("Error fetching devices:", error);
    });
  }, []);
  const headers = [
    'Назва приладу',
    'кВт мін',
    'кВт макс',
    'Крок в кВт',
    'кВт макс в місяць'
  ];
  return (
    <Table className="bg-white w-auto mx-auto rounded-xl h-full">
      <TableHeader>
        <TableRow>
          {headers.map((header)=>(
            <TableHead>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm text-gray-600">
        {data?.map((device, index) => (
          <TableRow key={index} className="bg-white">
            <TableCell>{device.nameDevice}</TableCell>
            <TableCell>{device.kwMin}</TableCell>
            <TableCell>{device.kwMax}</TableCell>
            <TableCell>{device.stepKw}</TableCell>
            <TableCell>{device.maxKwMonth}</TableCell>
            <TableCell className='cursor-pointer'><ActionWithCell data={device} setDevices={setData}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllDevice;
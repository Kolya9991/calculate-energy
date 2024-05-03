'use client'
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { DeviceSchema } from "@/schemas";
import { getDeviceById } from "@/actions/get-device";
import { useParams } from "next/navigation";
import UpdateDevice from "@/components/update-device/UpdateDevice";

const DevicePage = () => {
  const params = useParams();
  const [device, setDevice] = useState<z.infer<typeof DeviceSchema> | null>(null);

  useEffect(() => {
    if (params.deviceId) {
      getDeviceById(String(params.deviceId)).then(setDevice);
    }
  }, [params.deviceId]);  // Добавьте params.deviceId в список зависимостей, чтобы избежать лишних вызовов

  if (!device) {
    return <div>Loading...</div>;  // Обработка состояния загрузки
  }

  return (
    <UpdateDevice initialData={device}/>
  );
};

export default DevicePage;

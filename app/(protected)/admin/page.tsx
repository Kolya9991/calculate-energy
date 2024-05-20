'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AddNewDevice from "@/components/add-new-device/AddNewDevice";
import AllDevice from "@/components/all-device/AllDevice";
import GetAllContactUs from "@/components/GetAllContactUs";
import ImportDevicesAdmin from "@/components/import-device-admin/ImportDevicesAdmin";

const AdminPage = () => {
  return (
    <Tabs defaultValue='add' className='flex flex-col items-center w-full md:w-auto'>
      <TabsList className='flex h-auto flex-wrap '>
        <TabsTrigger value='add'>Додати пристрій</TabsTrigger>
        <TabsTrigger value='get'>Всі пристрої</TabsTrigger>
        <TabsTrigger value='import'>Імпортувати</TabsTrigger>
        <TabsTrigger value='contact'>Запитання від користувачів</TabsTrigger>
      </TabsList>
      <TabsContent value='add' className='w-full'><AddNewDevice/></TabsContent>
      <TabsContent value='get' className='overflow-visible w-full'><AllDevice/></TabsContent>
      <TabsContent value='import' className='w-full'><ImportDevicesAdmin/></TabsContent>
      <TabsContent value='contact' className='overflow-visible w-full'><GetAllContactUs/></TabsContent>
    </Tabs>
  );
};

export default AdminPage;

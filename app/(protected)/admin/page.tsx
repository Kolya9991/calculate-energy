'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewDevice from "@/components/add-new-device/AddNewDevice";
import AllDevice from "@/components/all-device/AllDevice";
import ImportDevices from "@/components/import-devices/ImportDevices";

const AdminPage = () => {
  return (
    <Tabs defaultValue='add' className='flex flex-col items-center w-full md:w-auto'>
      <TabsList className='flex max-w-full overflow-x-scroll md:overflow-visible'>
        {/*TODO: Fix style for overflow-x-scroll*/}
        {/*TODO: Fix style for every page admin side*/}
        <TabsTrigger value='add'>Додати пристрій</TabsTrigger>
        <TabsTrigger value='get'>Всі пристрої</TabsTrigger>
        <TabsTrigger value='import'>Імпортувати</TabsTrigger>
      </TabsList>
      <TabsContent value='add' className='w-full'><AddNewDevice/></TabsContent>
      <TabsContent value='get' className='overflow-visible w-full'><AllDevice/></TabsContent>
      <TabsContent value='import' className='w-full'><ImportDevices/></TabsContent>
    </Tabs>
  );
};

export default AdminPage;

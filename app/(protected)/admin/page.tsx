'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AddNewDevice from "@/components/add-new-device/AddNewDevice";
import AllDevice from "@/components/all-device/AllDevice";

const AdminPage = () => {


  return (
    <Tabs defaultValue='add' className='flex flex-col items-center'>
      <TabsList className='flex max-w-min'>
        <TabsTrigger value='add'>Додати новий пристрій</TabsTrigger>
        <TabsTrigger value='get'>Показати всі пристрої</TabsTrigger>
      </TabsList>
      <TabsContent value='add'><AddNewDevice/></TabsContent>
      <TabsContent value='get'><AllDevice/></TabsContent>
    </Tabs>
  );
};

export default AdminPage;
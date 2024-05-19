import CalcForm from "@/components/calc-form/CalcForm";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EnergyCalculator from "@/components/energy-calculate/EnergyCalculator";
import ExportTemplate from "@/components/export-template/ExportTemplate";

const CalcPage = () => {
  return (
    <div className='mt-6'>
      <p className="mt-4 text-lg text-center mb-3 flex justify-center">
        На цій сторінці можно зробити розрахунок енергоефективності пристроїв. Виберіть, будь ласка, кількість пристроїв для розрахунку.
      </p>
      <Tabs defaultValue='one' className='flex flex-col items-center w-full md:w-auto'>
        <TabsList className='flex max-w-full overflow-x-scroll md:overflow-visible'>
          <TabsTrigger value='one'>Один пристрій</TabsTrigger>
          <TabsTrigger value='two'>Декілька пристроїв</TabsTrigger>
        </TabsList>
        <TabsContent value='one' className='w-full'><CalcForm/></TabsContent>
        <TabsContent value='two' className='w-full'><EnergyCalculator/></TabsContent>
      </Tabs>
      {/*<ExportTemplate/>*/}
    </div>
  );
};

export default CalcPage;

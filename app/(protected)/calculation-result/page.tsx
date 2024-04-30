import ExportToPdfButton from "@/components/export-to-pdf/ExportToPDFButton";
import {IDeviceProps} from "@/types/calculateDevice";
import ExportToDocxButton from "@/components/export-to-docx/ExportToDocxButton";
import ExportToXLSXButton from "@/components/export-to-xlsx/ExportToXLSXButton";

const Page = () => {
  const array: IDeviceProps[] = [
    {nameDevice: 'Телевізор', count: 1, hoursWork: 10, period: 'В день', kwMin: 0.01, kwMax: 0.5, stepKw: 0.01, kw: 0.25, kwMonth: 10},
    {nameDevice: 'Холодильник', count: 1, hoursWork: 24, period: 'В день', kwMin: 0.1, kwMax: 1, stepKw: 0.05, kw: 0.5, kwMonth: 15},
    {nameDevice: 'Мікрохвильова піч', count: 1, hoursWork: 0.5, period: 'В день', kwMin: 0.5, kwMax: 1.5, stepKw: 0.1, kw: 1, kwMonth: 0.5},
    {nameDevice: 'Кондиціонер', count: 2, hoursWork: 5, period: 'В день', kwMin: 0.8, kwMax: 2, stepKw: 0.1, kw: 1.5, kwMonth: 45},
    {nameDevice: 'Пральна машина', count: 1, hoursWork: 2, period: 'В тиждень', kwMin: 0.2, kwMax: 2, stepKw: 0.05, kw: 1, kwMonth: 8},
    {nameDevice: 'Посудомийна машина', count: 1, hoursWork: 1.5, period: 'В тиждень', kwMin: 0.5, kwMax: 1.5, stepKw: 0.1, kw: 1.2, kwMonth: 6},
    {nameDevice: 'Електрочайник', count: 1, hoursWork: 0.4, period: 'В день', kwMin: 0.5, kwMax: 2, stepKw: 0.1, kw: 1.8, kwMonth: 5.4},
    {nameDevice: 'Тостер', count: 1, hoursWork: 0.2, period: 'В день', kwMin: 0.4, kwMax: 1, stepKw: 0.05, kw: 0.7, kwMonth: 4.2},
    {nameDevice: 'Комп’ютер', count: 1, hoursWork: 8, period: 'В день', kwMin: 0.1, kwMax: 0.4, stepKw: 0.01, kw: 0.3, kwMonth: 24},
    {nameDevice: 'Лампа настільна', count: 2, hoursWork: 5, period: 'В день', kwMin: 0.01, kwMax: 0.1, stepKw: 0.01, kw: 0.05, kwMonth: 3},
    {nameDevice: 'Вентилятор', count: 1, hoursWork: 4, period: 'В день', kwMin: 0.02, kwMax: 0.2, stepKw: 0.01, kw: 0.1, kwMonth: 1.2}
  ];

  return (
    <div className='space-x-4'>
      <ExportToPdfButton data={array}/>
      <ExportToDocxButton data={array}/>
      <ExportToXLSXButton data={array}/>
    </div>
  );
};

export default Page;
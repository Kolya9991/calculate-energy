'use client';
import React, { FC, useState } from 'react';
import ExcelJS from 'exceljs';
import { toast } from 'sonner';
import {Button} from "@/components/ui/button";

interface ImportDevicesProps {
  onImport: (devices: any[]) => void;
  importAdminDevice?: boolean;
}

const ImportDevices: FC<ImportDevicesProps> = ({ onImport, importAdminDevice }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const calculateKwMonth = (count: number, hoursWork: number, kw: number, period: string) => {
    let daysInPeriod = 30; // Default to month
    if (period === "В день") daysInPeriod = 1;
    if (period === "В тиждень") daysInPeriod = 7;

    return count * hoursWork * kw * daysInPeriod;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error('Будь ласка, виберіть файл перед надсиланням');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(e.target.result as ArrayBuffer);

        const sheetsData: any[] = [];
        workbook.eachSheet((sheet) => {
          const sheetData: any[] = [];
          const headerRow = sheet.getRow(1);
          sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header row
            const rowData: any = {};
            row.eachCell((cell, colNumber) => {
              const headerCell = headerRow.getCell(colNumber);
              if (headerCell && headerCell.value) {
                const headerValue = typeof headerCell.value === 'object' ? JSON.stringify(headerCell.value) : String(headerCell.value);
                rowData[headerValue] = cell.value;
              }
            });
            sheetData.push(rowData);
          });
          sheetsData.push(...sheetData);
        });

        const translatedData = !importAdminDevice ? translateDevice(sheetsData) : translateFields(sheetsData);
        console.log("Translated data:", translatedData); // Log translated data
        onImport(translatedData);
        toast.success('Файл успішно оброблено');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const translateFields = (data: any[]) => {
    return data.map(item => ({
      id: '',
      nameDevice: String(item['Назва приладу']),
      kwMin: String(item['кВт мін']),
      kwMax: String(item['кВт макс']),
      stepKw: String(item['Крок кВт']),
      maxKwMonth: String(item['Макс кВт в місяць']),
      stepKwMin: String(item['крок кВт мін']),
      stepKwMax: String(item['крок кВт макс']),
    }));
  };

  const translateDevice = (data: any[]) => {
    return data.map(item => {
      const count = Number(item['Кількість']);
      const hoursWork = Number(item['Години роботи']);
      const kw = Number(item['кВт']);
      const period = String(item['Період']);

      return {
        id: '',
        nameDevice: item['Назва приладу'],
        count: item['Кількість'],
        hoursWork: item['Години роботи'],
        period: item['Період'],
        kw: item['кВт'],
        kwMonth: calculateKwMonth(count, hoursWork, kw, period).toString()
      };
    });
  };

  return (
    <div className='mt-3 mb-8'>
      <form onSubmit={handleSubmit} className='flex flex-col items-baseline gap-1'>
        <p className='mb-2'>Виберіть файл для імпорту</p>
        <input type="file" onChange={handleFileChange} accept=".xlsx" />
        <Button type='submit'>Завантажити файл</Button>
      </form>
    </div>
  );
};

export default ImportDevices;

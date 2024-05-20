'use client';
import React, { FC, useState } from 'react';
import ExcelJS from 'exceljs';
import { toast } from 'sonner';

interface ImportDevicesProps {
  onImport: (devices: any[]) => void;
}

const ImportDevices: FC<ImportDevicesProps> = ({ onImport }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
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

        const translatedData = translateFields(sheetsData);
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
      nameDevice: item['Назва приладу'],
      count: item['Кількість'],
      hoursWork: item['Години роботи'],
      period: item['Період'],
      kw: item['кВт'],
      kwMonth: item['кВт в місяць']
    }));
  };

  return (
    <div className='mt-3 mb-8'>
      <form onSubmit={handleSubmit}>
        <p className='mb-2'>Виберіть файл для імпорту</p>
        <input type="file" onChange={handleFileChange} accept=".xlsx" />
        <button type="submit">Завантажити файл</button>
      </form>
    </div>
  );
};

export default ImportDevices;

'use client';
import React, {FC, useState} from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface ImportDevicesProps {
  onImport: (devices: any[]) => void;
}

const ImportDevices: FC<ImportDevicesProps> = ({ onImport }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetsData: any[] = [];
          workbook.SheetNames.forEach((sheetName) => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            sheetsData.push(...sheetData); // Flatten the data
          });
          const translatedData = translateFields(sheetsData);
          console.log("Translated data:", translatedData); // Log translated data
          onImport(translatedData);
        }
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error('Будь ласка, виберіть файл перед надсиланням');
      return;
    }

    toast.success('Файл успішно оброблено');
  };

  return (
    <div className='mt-3 mb-8'>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".xlsx" />
      </form>
    </div>
  );
};

export default ImportDevices;

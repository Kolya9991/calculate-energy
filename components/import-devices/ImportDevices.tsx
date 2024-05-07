import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ImportDevices = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Array<any>>([]); // Добавляем состояние для данных

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]); // Получаем первый файл
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetsData: React.SetStateAction<any[]> = []; // Массив для данных со всех листов
          workbook.SheetNames.forEach((sheetName) => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            sheetsData.push({ sheetName, sheetData });
          });
          setData(sheetsData); // Обновляем состояние данными
        }
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    if (!file) {
      alert('Пожалуйста, выберите файл перед отправкой');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/read-xlsx', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.data);
        alert('Файл успешно обработан');
      } else {
        console.error('Ошибка при загрузке файла');
        alert('Ошибка при загрузке файла');
      }
    } catch (error) {
      console.error('Ошибка сети', error);
      alert('Ошибка сети при попытке отправки файла');
    }
  };
  // TODO: make updateMany for device, and reuse it for calculate for user
  return (
    <div>
      <h1>Импорт устройств</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".xlsx"/>
        <button type="submit">Загрузить файл</button>
      </form>
      {data.length > 0 && (
        <div>
          {data.map((sheet, index) => (
            <div key={index}>
              <h3>{sheet.sheetName}</h3>
              <ul>
                {sheet.sheetData.map((row: any, idx: any) => (
                  <li key={idx}>{JSON.stringify(row)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImportDevices;

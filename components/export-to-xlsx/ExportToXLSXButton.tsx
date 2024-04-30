'use client';
import {FC} from 'react'
import * as XLSX from 'xlsx';
import {IDeviceProps} from "@/types/calculateDevice";
import {Button} from "@/components/ui/button";

interface IExportToXlsxButtonProps {
  data: IDeviceProps[]
}

const ExportToXlsxButton: FC<IExportToXlsxButtonProps> = ({data}) => {
  const exportToExcel = () => {
    const rows = data.map(item => ({
      'Назва приладу': item.nameDevice,
      'Кількість': item.count,
      'Години роботи': item.hoursWork,
      'Період': item.period,
      'кВт': item.kw,
      'кВт в місяць': item.kwMonth
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Розрахунок енергоефективностi");
    XLSX.writeFile(workbook, 'Розрахунок енергоефективностi.xlsx');
  };

  return <Button onClick={exportToExcel}>Экспорт в excel</Button>;
};

export default ExportToXlsxButton;

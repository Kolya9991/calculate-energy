'use client';
import {FC} from 'react';
import * as XLSX from 'xlsx';
import {IDeviceProps} from "@/types/calculateDevice";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

interface IExportToXlsxButtonProps {
  data: IDeviceProps[];
  disabled?: boolean;
}

const ExportToXlsxButton: FC<IExportToXlsxButtonProps> = ({data, disabled}) => {
  const exportToExcel = () => {
    if (disabled) {
      toast.error('Виберіть хочаб один checkbox');
      return;
    }

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

  return (
    <div onClick={disabled ? () => toast.error('Виберіть хочаб один checkbox') : undefined}>
      <Button onClick={exportToExcel} disabled={disabled}>Экспорт в excel</Button>
    </div>
  );
};

export default ExportToXlsxButton;

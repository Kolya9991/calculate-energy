'use client';
import { FC } from 'react';
import ExcelJS from 'exceljs';
import { IDeviceProps } from "@/types/calculateDevice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IExportToXlsxButtonProps {
  data: IDeviceProps[];
  disabled?: boolean;
}

const ExportToXlsxButton: FC<IExportToXlsxButtonProps> = ({ data, disabled }) => {
  const exportToExcel = () => {
    if (disabled) {
      toast.error('Виберіть хочаб один checkbox');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Розрахунок енергоефективностi');

    worksheet.columns = [
      { header: 'Назва приладу', key: 'nameDevice', width: 30 },
      { header: 'Кількість', key: 'count', width: 10 },
      { header: 'Години роботи', key: 'hoursWork', width: 15 },
      { header: 'Період', key: 'period', width: 20 },
      { header: 'кВт', key: 'kw', width: 10 },
      { header: 'кВт в місяць', key: 'kwMonth', width: 15 },
    ];

    data.forEach(item => {
      worksheet.addRow({
        nameDevice: item.nameDevice,
        count: item.count,
        hoursWork: item.hoursWork,
        period: item.period,
        kw: item.kw,
        kwMonth: item.kwMonth,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Розрахунок енергоефективностi.xlsx';
      link.click();
    });
  };

  return (
    <div onClick={disabled ? () => toast.error('Виберіть хочаб один checkbox') : undefined}>
      <Button onClick={exportToExcel} disabled={disabled}>Экспорт в excel</Button>
    </div>
  );
};

export default ExportToXlsxButton;

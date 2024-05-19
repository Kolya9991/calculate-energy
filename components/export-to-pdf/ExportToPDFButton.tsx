'use client';
import {FC} from 'react'
import {IDeviceProps} from "@/types/calculateDevice";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {robotoBase64} from "@/robotoFontBase64";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

interface IExportToPdfButtonProps {
  data: IDeviceProps[];
  disabled?: boolean;
}

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

const ExportToPdfButton: FC<IExportToPdfButtonProps> = ({data, disabled}) => {
  const exportPDF = () => {
    if(disabled){
      toast.error('Виберіть хочаб один checkbox')
      return;
    }
    const doc = new jsPDF();

    doc.addFileToVFS('Roboto-Regular.ttf', robotoBase64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');

    const headers = [
      'Назва приладу',
      'Кількість',
      'Години роботи',
      'Період',
      'кВт',
      'кВт в місяць'
    ];

    const rows = data.map(item => [
      item.nameDevice,
      item.count,
      item.hoursWork,
      item.period,
      item.kw,
      item.kwMonth
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      styles: { font: 'Roboto' }
    });

    doc.save('Розрахунок енергоефективностi.pdf');
  };

  return (
    <div onClick={disabled ? () => toast.error('Виберіть хочаб один checkbox') : undefined}>
      <Button onClick={exportPDF} disabled={disabled}>Экспорт в PDF</Button>
    </div>
  )
};

export default ExportToPdfButton;

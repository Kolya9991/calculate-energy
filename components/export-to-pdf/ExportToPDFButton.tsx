'use client';
import {FC} from 'react'
import {IDeviceProps} from "@/types/calculateDevice";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {robotoBase64} from "@/robotoFontBase64";
import {Button} from "@/components/ui/button";

interface IExportToPdfButtonProps {
  data: IDeviceProps[]
}

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

const ExportToPdfButton: FC<IExportToPdfButtonProps> = ({data}) => {
  const exportPDF = () => {
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
      'кВт в месяц'
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

    doc.save('report.pdf');
  };

  return <Button onClick={exportPDF}>Экспорт в PDF</Button>;
};

export default ExportToPdfButton;
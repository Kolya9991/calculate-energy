'use client'
import {FC} from 'react'
import {IDeviceProps} from "@/types/calculateDevice";
import {Button} from "@/components/ui/button";
import {Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType} from 'docx';
import {saveAs} from 'file-saver';
import {toast} from "sonner";

interface IExportToDocxButtonProps {
  data: IDeviceProps[];
  disabled?: boolean;
}

const ExportToDocxButton: FC<IExportToDocxButtonProps> = ({data, disabled}) => {
  const exportToDocx = () => {
    if (disabled) {
      toast.error('Виберіть хочаб один checkbox');
      return;
    }
    const tableRows = data.map(item =>
      new TableRow({
        children: [
          new TableCell({children: [new Paragraph(item.nameDevice)]}),
          new TableCell({children: [new Paragraph(item.count.toString())]}),
          new TableCell({children: [new Paragraph(item.hoursWork.toString())]}),
          new TableCell({children: [new Paragraph(item.period.toString())]}),
          new TableCell({children: [new Paragraph(item.kw.toString())]}),
          new TableCell({children: [new Paragraph(item.kwMonth.toString())]}),
        ],
      }),
    );

    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({children: [new Paragraph("Назва приладу")]}),
            new TableCell({children: [new Paragraph("Кількість")]}),
            new TableCell({children: [new Paragraph("Години роботи")]}),
            new TableCell({children: [new Paragraph("Період")]}),
            new TableCell({children: [new Paragraph("кВт")]}),
            new TableCell({children: [new Paragraph("кВт в місяць")]}),
          ],
        }),
        ...tableRows,
      ],
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: [table],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "Розрахунок енергоефективностi.docx");
    });
  };
  return (
    <div onClick={disabled ? () => toast.error('Виберіть хочаб один checkbox') : undefined}>
      <Button onClick={exportToDocx} disabled={disabled}>Экспорт в word</Button>
    </div>
  )
};

export default ExportToDocxButton;

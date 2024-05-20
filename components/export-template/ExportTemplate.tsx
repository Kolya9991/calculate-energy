import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType} from 'docx';
import {saveAs} from 'file-saver';
import ExcelJS from 'exceljs';
import {excelIcon, headers, headersXlsxTemplate, headersXlsxTemplateDevice,  wordIcon} from "@/constans";
import {FC} from "react";

interface IExportTemplateProps {
  disabledExcelTemplate?: boolean;
  disabledWordTemplate?: boolean;
  adminTemplateExcel?: boolean;
}

const ExportTemplate: FC<IExportTemplateProps> = ({disabledExcelTemplate, disabledWordTemplate, adminTemplateExcel}) => {

  const exportWordTemplate = () => {
    const headerRow = new TableRow({
      children: headers.map(header => new TableCell({children: [new Paragraph(header)]}))
    });
    const table = new Table({
      width: {size: 100, type: WidthType.PERCENTAGE},
      rows: [headerRow],
    });
    const doc = new Document({
      sections: [{children: [table]}],
    });
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "Шаблон.docx");
    });
  };

  const exportExcelTemplate = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Шаблон');

    // Add header row
    const headerRow = Object.keys(adminTemplateExcel ? headersXlsxTemplateDevice : headersXlsxTemplate);
    worksheet.addRow(headerRow);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      saveAs(blob, 'Шаблон.xlsx');
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-max">
          Виберіть формат файлу, для шаблону
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Формат файла</DropdownMenuLabel>
        <DropdownMenuItem onClick={exportWordTemplate} disabled={disabledWordTemplate}>
          <img src={wordIcon} width="24" height="24" alt="Word Icon" style={{marginRight: 8}}/>
          Word file
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportExcelTemplate} disabled={disabledExcelTemplate}>
          <img src={excelIcon} width="24" height="24" alt="Excel Icon" style={{marginRight: 8}}/>
          Excel file
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportTemplate;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {excelIcon, headers, headersXlsxTemplate, wordIcon} from "@/constans";


const ExportTemplate = () => {

  const exportWordTemplate = () => {
    const headerRow = new TableRow({
      children: headers.map(header => new TableCell({ children: [new Paragraph(header)] }))
    });
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow],
    });
    const doc = new Document({
      sections: [{ children: [table] }],
    });
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "Шаблон.docx");
    });
  };

  const exportExcelTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([headersXlsxTemplate], { header: Object.keys(headersXlsxTemplate) });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Шаблон");
    XLSX.writeFile(workbook, 'Шаблон.xlsx');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-max">
          Виберіть формат для імпорту власних даних
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Формат файла</DropdownMenuLabel>
        <DropdownMenuItem onClick={exportWordTemplate}>
          <img src={wordIcon} width="24" height="24" alt="Word Icon" style={{marginRight: 8}}/>
          Word file
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportExcelTemplate}>
          <img src={excelIcon} width="24" height="24" alt="Excel Icon" style={{marginRight: 8}}/>
          Excel file
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportTemplate;


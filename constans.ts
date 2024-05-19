export const wordIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXvNIBsQeB-1iv2Y3hfgbMG9r7uJeg5geHcXDTwEKbQQ&s"
export const excelIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/800px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
export const headers = ["Назва приладу", "Кількість", "Години роботи", "Період", "кВт", "кВт в місяць"];
// TODO: remove kw in month after create logic calculate
export const headersXlsxTemplate = {
  'Назва приладу': null,
  'Кількість': null,
  'Години роботи': null,
  'Період': null,
  'кВт': null,
  'кВт в місяць': null
};

export const periodOptions = [
  {label: 'В день', code: 'day'},
  {label: 'В тиждень', code: 'week'},
  {label: 'В місяць', code: 'month'},
]

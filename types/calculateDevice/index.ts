export interface IDeviceProps {
  nameDevice: string;
  count: number;
  hoursWork: number;
  period: 'В день' | 'В тиждень' | 'В місяць';
  kwMin: number;
  kwMax: number;
  stepKw: number;
  kw: number;
  kwMonth: number;
}

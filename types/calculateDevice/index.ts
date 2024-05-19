export interface IDeviceProps {
  nameDevice: string;
  count: string;
  hoursWork: string;
  period: string;
  kwMin?: string;
  kwMax?: string;
  stepKw?: string;
  kw: string;
  kwMonth: string;
  maxKwMonth?: string;
}

export interface ICalculateDeviceProps {
  nameDevice: string;
  count: number;
  hoursWork: number;
  period: 'В день' | 'В тиждень' | 'В місяць';
  kwMin?: number;
  kwMax?: number;
  stepKw?: number;
  kw: number;
  kwMonth: number;
  maxKwMonth?: number;
}

export class DynamicSelectorField<T> {
  label: keyof T;
  value: keyof T;
  showInfo?: {
    label: string;
    key: keyof T;
    suffix?: string;
  }[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectBoxProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  bgType?: 'default' | 'modal';
  width?: string;
  height?: string;
  onValueChange?: (value: string) => void;
}

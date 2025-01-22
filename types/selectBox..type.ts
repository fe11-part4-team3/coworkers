export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectBoxProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  onValueChange?: (value: string) => void;
}

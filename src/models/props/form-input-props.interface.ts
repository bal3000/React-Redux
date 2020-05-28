export interface IFormInputProps<T extends HTMLElement> {
  label: string;
  name: string;
  options?: Options[];
  value?: string;
  error?: string;
  defaultOption?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<T>) => void;
}

interface Options {
  text: string;
  value: number;
}

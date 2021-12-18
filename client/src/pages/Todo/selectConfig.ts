import { StylesConfig } from 'react-select';

export interface Option {
  value: string;
  label: string;
  color: string;
}

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const importanceStyles: StylesConfig<Option> = {
  option: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export const importanceOptions = [
  { value: 'Не важно', label: 'Не важно', color: 'green' },
  { value: 'Средне', label: 'Средне', color: 'orange' },
  { value: 'Важно', label: 'Важно', color: 'red' },
];

export const categoryOptions = [
  { value: 'Баги', label: 'Баги' },
  { value: 'Стили', label: 'Стили' },
  { value: 'Функционал', label: 'Функционал' },
  { value: 'Другое', label: 'Другое' },
];

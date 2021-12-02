import { format } from 'date-fns';

const weekDays = [
  { value: 'Monday', label: 'Пн' },
  { value: 'Tuesday', label: 'Вт' },
  { value: 'Wednesday', label: 'Ср' },
  { value: 'Thursday', label: 'Чт' },
  { value: 'Friday', label: 'Пт' },
  { value: 'Saturday', label: 'Сб' },
  { value: 'Sunday', label: 'Вс' },
];

export function getDaysFormated(month: number, year: number) {
  const daysCount = new Date(year, month - 1, 0).getDate();
  const days = [];

  for (let i = 1; i <= daysCount; i++) {
    const day = new Date(new Date().getFullYear(), month, i);
    const formatedDay = format(day, 'iiii dd.MM.yyyy');
    days.push(formatedDay);
  }

  for (let i = 0; i < weekDays.length; i++) {
    const day = days[i];
    if (day) {
      const weekDay = day.split(' ')[0];
      if (weekDay !== weekDays[i].value) {
        days.unshift(null);
        continue;
      }
    }
  }

  return { days, weekDays };
}

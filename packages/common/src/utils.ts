import moment from "moment";
import { TimelessDate } from "./klass";

export const generateRandomNDigitNumber = (n: number) => {
  const max = Math.pow(10, n);
  const min = Math.pow(10, n - 1);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomId = () => {
  return generateRandomNDigitNumber(8);
};

export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export const getAllDatesBetween = (startDateRw: Date, endDateRw: Date): TimelessDate[] => {
  const startDate = moment(startDateRw);
  const endDate = moment(endDateRw);
  const allDates: TimelessDate[] = [];

  if (startDate.isValid() && endDate.isValid() && startDate.isBefore(endDate)) {
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      allDates.push(new TimelessDate(currentDate.toDate()));
      currentDate.add(1, 'day');
    }
  }

  return allDates;
}
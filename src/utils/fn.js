import { factorials } from "./constant";

const getDecimal = (number) => {
  return parseFloat(number.toFixed(1));
};

const covertToDate = (dateString) => {
  const date = new Date(Date.parse(dateString));
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  return formattedDate;
};

const getFactorValue = (factor) => {
  const key = Object.keys(factor)[0];
  const item = factorials.find((el) => el.hasOwnProperty(key));
  return item[key][factor[key]];
};

export { getDecimal, covertToDate, getFactorValue };

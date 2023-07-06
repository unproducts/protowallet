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

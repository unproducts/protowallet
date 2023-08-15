import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js');
};

export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(new Blob([new Uint8Array(event.target.result)], {type: file.type }));
    };
    reader.readAsArrayBuffer(file);
  });

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

/**
 * The formatDate function takes a Date object as a parameter and uses the toLocaleDateString method to obtain a formatted date string with the day and month in the desired format. It then processes the day component to append the appropriate suffix (e.g., "st," "nd," "rd," or "th"). Finally, it checks if the year of the given date is different from the current year and appends it to the formatted string if necessary.
 * @param {date} Date
 * @returns string: formatted date
 */
export function formatDate(date) {
  const options = { day: 'numeric', month: 'short' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  const month = formattedDate.split(' ')[0];
  const year = date.getFullYear();

  let formattedString = `${day}`;
  if (formattedString.endsWith('1') && !formattedString.endsWith('11')) {
    formattedString += 'st';
  } else if (formattedString.endsWith('2') && !formattedString.endsWith('12')) {
    formattedString += 'nd';
  } else if (formattedString.endsWith('3') && !formattedString.endsWith('13')) {
    formattedString += 'rd';
  } else {
    formattedString += 'th';
  }

  formattedString += ` ${month}`;

  if (year !== new Date().getFullYear()) {
    formattedString += ` ${year}`;
  }

  return formattedString;
}
export const formatAmount = (value, currencySymbol) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencySymbol,
    notation: 'standard',
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

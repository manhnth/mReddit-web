export const formatMovementDate = function (date: string, locale = 'en-US') {
  const calcDaysPassed = (date1: any, date2: any) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60));

  const daysPassed = calcDaysPassed(new Date().getTime(), Date.parse(date));
  // console.log(daysPassed);
  if (daysPassed < 60) return `${daysPassed} min ago`;
  if (daysPassed < 60 * 24) return `${Math.round(daysPassed / 60)} hours ago`;
  if (daysPassed > 60 * 24 && daysPassed < 60 * 24 * 7)
    return `${Math.round(daysPassed / (60 * 24))} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(Date.parse(date));
};

export const formatNb = (nb: number) => {
  if (nb > 1000) return `${(nb / 1000).toFixed(1)}k`;
  return nb;
};

export function truncateText(str: any, n = 40) {
  if (str.length > n) {
    return str.substring(0, n) + '...';
  } else {
    return str;
  }
}

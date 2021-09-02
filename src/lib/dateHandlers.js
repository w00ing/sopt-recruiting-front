export const getYears = (startYear) => {
  const currentYear = new Date().getFullYear();
  let years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

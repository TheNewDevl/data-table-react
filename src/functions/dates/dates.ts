/**
 * Check if the given param is a valid date
 * @param date - Date to check
 * @returns - True if valid date, false otherwise
 */
export const isValidDate: (date: any) => boolean = (date) => {
  if (date instanceof Date) {
    return true;
  } else if (typeof date === "string") {
    return (
      /^\d{2}-|\/\d{2}-|\/\d{4}$/.test(date) && Number(date.split(/[-/]/)[2]) > 1900 && !isNaN(new Date(date).getTime())
    );
  }
  return false;
};

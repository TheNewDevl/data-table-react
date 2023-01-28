/**
 * Check if the given param is a valid date
 * @param date - Date to check
 * @returns - True if valid date, false otherwise
 */
export const isValidDate: Function = (date: any): boolean =>
  /^\d{2}-|\/\d{2}-|\/\d{4}$/.test(date) && !isNaN(new Date(date).getTime());

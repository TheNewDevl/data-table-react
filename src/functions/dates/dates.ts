/**
 * Check if the given param is a valid date
 * @param date - Date to check
 * @returns - True if valid date, false otherwise
 */
export const isValidDate: (date: any) => boolean = (date) => {
  return (typeof date === "string" && !isNaN(new Date(date).getTime())) || date instanceof Date;
};

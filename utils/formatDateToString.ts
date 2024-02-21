export function formatDateToString(date: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString(); // Extract the last two digits of the year
    const formattedDate = `${month}-${date.getDate()} ${year}`;
    
    return formattedDate;
  }

export function TimeConverter (data: any) {
  const newDate = new Date(data);
  return newDate.toLocaleString();
}

export function CustomTimeFormat (data:string) {

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]

  const newDate = new Date(data);

  const year = newDate.getFullYear();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const day =  newDate.getDay()
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const second = newDate.getSeconds();
  const timeZone =Intl.DateTimeFormat().resolvedOptions().timeZone;


  return {
      year, 
      date, 
      month:months[month], 
      day:days[day],
      hour,
      minute,
      second,
      timeZone
  }
}
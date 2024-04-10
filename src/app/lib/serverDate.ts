import { format } from 'date-fns';

export default function generateServerDate() {
  const serverDate = new Date();
  const formattedDate = format(serverDate, 'yyyy-MM-dd');

  return formattedDate;
}
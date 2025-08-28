import dayjs from 'dayjs';
import localeEs from 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

const ONLY_DATE_FORMAT = 'DD/MM/YYYY';
const ONLY_TIME_FORMAT = 'HH:mm';
const SERVER_DATE_FORMAT = 'YYYY-MM-DD';

class DateTime {
  static instance = new DateTime();

  timeAgo(dateIso: Date) {
    const locale = localeEs;
    const day = dayjs;
    day.extend(relativeTime);
    return day(dateIso).locale(locale).fromNow();
  }

  onlyDate(dateIso: Date) {
    return dayjs(dateIso).format(ONLY_DATE_FORMAT);
  }

  onlyTime(dateIso: any) {
    return dayjs(dateIso).format(ONLY_TIME_FORMAT);
  }

  serverDate(dateIso: Date) {
    return dayjs(dateIso).format(SERVER_DATE_FORMAT);
  }

  difference(start: Date, end: Date) {
    return dayjs(end).diff(dayjs(start), 'second');
  }
}

export default DateTime;

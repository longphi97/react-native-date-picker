import moment from 'moment-timezone';
import { Platform } from 'react-native';
const FORMAT_DATE_DISPLAY = 'DD/MM/YYYY';
const FORMAT_DATE_TO_CALENDER = 'YYYY-MM-DD';

const MIDDLE_COLOR = 'rgba(0, 0,0,  0.2)';
const START_NODE_COLOR = '#000000';
const END_NODE_COLOR = '#000000';

export const getTitle = ({
  startDate,
  endDate,
  option = {},
}: {
  startDate: any;
  endDate: any;
  option: any;
}) => {
  let title = option?.name;
  if (startDate && endDate) {
    if (
      moment(startDate, FORMAT_DATE_DISPLAY).isSame(
        moment(endDate, FORMAT_DATE_DISPLAY)
      )
    ) {
      title = `${title}(${startDate})`;
    } else {
      title = `${title}( ${startDate} - ${endDate} ) `;
    }
  }

  return title;
};
export const formatDate = (day: any) => {
  if (!day) {
    return;
  }
  return moment(day, FORMAT_DATE_DISPLAY).format(FORMAT_DATE_TO_CALENDER);
};

export const getMaxDate = (startDate: any, maxDate: any) => {
  if (!startDate && !maxDate) {
    return;
  }
  if (!maxDate) {
    return addDate(startDate, '5', 'days');
  }
  if (!startDate) {
    return formatDate(maxDate);
  }
  const newMaxDate = addDate(startDate, '5', 'days');
  if (moment(newMaxDate).isBefore(moment(maxDate, FORMAT_DATE_DISPLAY))) {
    return newMaxDate;
  } else {
    return formatDate(maxDate);
  }
};
export const formatDateToDisplay = (day: any) => {
  if (!day) {
    return;
  }
  return moment(day, FORMAT_DATE_TO_CALENDER).format(FORMAT_DATE_DISPLAY);
};
export const formatDatePromotion = (day: any) => {
  if (!day) {
    return;
  }
  return moment(day).format(FORMAT_DATE_DISPLAY);
};

export const convertMarkedDates = (startDate: any, endDate: any) => {
  if (!startDate) {
    return {};
  }

  const middleDateStyle = { color: MIDDLE_COLOR, textColor: 'white' };
  const markedDates: any = {
    [startDate]: {
      color: START_NODE_COLOR,
      startingDay: Platform.OS === 'ios',
      textColor: 'white',
    },
  };

  if (!endDate) {
    markedDates[startDate].endingDay = true;
    return markedDates;
  }

  if (moment(startDate).isSame(endDate)) {
    markedDates[startDate].endingDay = true;
    return markedDates;
  }

  let nextStartDate: any = addDate(startDate, 1, 'days');
  markedDates[endDate] = {
    endingDay: Platform.OS === 'ios',
    color: END_NODE_COLOR,
    textColor: 'white',
  };

  while (moment(nextStartDate).isBetween(startDate, endDate)) {
    markedDates[nextStartDate] = middleDateStyle;
    nextStartDate = addDate(nextStartDate, 1, 'days');
  }

  return markedDates;
};

export const addDate = (day: any, number: number | string, type: any) => {
  if (!day) {
    return;
  }
  return moment(day, FORMAT_DATE_TO_CALENDER)
    .add(number, type)
    .format(FORMAT_DATE_TO_CALENDER);
};
export const getLocalConfig = () => {
  return {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ],
    dayNames: [
      'Chủ Nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  };
};
export const getDisabledButton = (
  startDate: any,
  endDate: any,
  maxMonth: any
) => {
  if (!startDate) {
    return {
      disabled: true,
      error: 'Vui Lòng chọn thời gian muốn tìm kiếm',
    };
  }
  if (
    maxMonth &&
    startDate &&
    startDate &&
    moment(endDate)
      .startOf('day')
      .diff(moment(startDate).endOf('day'), 'months', true) > maxMonth
  ) {
    return {
      disabled: true,
      error: `Khoảng thời gian tìm kiếm không được vượt quá ${maxMonth} tháng`,
    };
  }
  return {
    disabled: false,
  };
};
export const getMaxDateValid = (startDate: any, maxMonth = 2) => {
  if (!startDate) {
    return null;
  }
  const endOfMonth = moment(startDate)
    .endOf('month')
    .format(FORMAT_DATE_TO_CALENDER);
  if (moment(startDate).isSame(endOfMonth)) {
    return moment(startDate)
      .add(maxMonth, 'month')
      .endOf('month')
      .format(FORMAT_DATE_TO_CALENDER);
  } else {
    return moment(startDate)
      .add(maxMonth, 'month')
      .format(FORMAT_DATE_TO_CALENDER);
  }
};

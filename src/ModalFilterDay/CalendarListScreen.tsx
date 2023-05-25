import React, { useEffect, useState, memo, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment-timezone';

import {
  formatDate,
  convertMarkedDates,
  getLocalConfig,
  formatDateToDisplay,
} from './HandleDate';
export function renderCustomHeader(date: any) {
  const header = date.toString('MMMM yyyy');
  return (
    <View key={header} style={styles.header}>
      <Text style={styles.year}>{header}</Text>
    </View>
  );
}

function PickerTimeField({
  getDate,
  dataSelected = {},
  data = [],
  maxDate,
  minDate,
  currentDate,
  maxMonth,
  futureScrollRange = 50,
}: any) {
  const optionSelected = dataSelected?.option;

  return (
    <View>
      <CalenderListCustom
        timeSelected={dataSelected}
        data={data}
        optionSelected={optionSelected}
        maxDate={maxDate}
        minDate={minDate}
        getDate={getDate}
        currentDate={currentDate}
        maxMonth={maxMonth}
        futureScrollRange={futureScrollRange}
      />
    </View>
  );
}

const CalenderListCustom = memo(
  ({
    maxDate,
    getDate,
    minDate = '01/01/2020',
    timeSelected = {},
    currentDate,
    futureScrollRange,
  }: any) => {
    LocaleConfig.locales.en = LocaleConfig.locales[''];
    LocaleConfig.locales.vi = getLocalConfig();
    LocaleConfig.defaultLocale = 'vi';
    const [startDate, setStartDate] = useState<any>(
      formatDate(timeSelected?.fromDate) || null
    );
    const [endDate, setEndDate] = useState(
      formatDate(timeSelected?.toDate) || null
    );

    const onDayPress = (day: any) => {
      let newStartDate = startDate;
      let newEndDate = endDate;

      if (!startDate) {
        newStartDate = day;
      } else {
        if (moment(startDate).isSame(day)) {
          newStartDate = null;
          newEndDate = null;
        } else if (endDate && moment(endDate).isSame(day)) {
          newEndDate = null;
        } else {
          if (moment(startDate).isBefore(day)) {
            newEndDate = day;
          } else {
            newEndDate = startDate;
            newStartDate = day;
          }
        }
      }

      setStartDate(newStartDate);
      setEndDate(newEndDate);
    };
    useEffect(() => {
      if (startDate && endDate) {
        const formatStartDate = formatDateToDisplay(startDate);
        const formatEndDate = formatDateToDisplay(endDate);
        getDate({
          fromDate: formatStartDate,
          toDate: formatEndDate,
          rangeDates: `${formatStartDate} - ${formatEndDate}`,
        });
      }
      if (startDate && endDate === null) {
        const formatStartDate = formatDateToDisplay(startDate);
        getDate({
          fromDate: formatStartDate,
          toDate: formatStartDate,
          rangeDates: `${formatStartDate} - ${formatStartDate}`,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    // const newMaxDate = getMaxDate(startDate, maxDate);
    const markedDates = convertMarkedDates(startDate, endDate);
    const pastScrollRange = useMemo(() => {
      return moment().diff(moment(minDate, 'DD/MM/YYYY'), 'M') + 12;
    }, [minDate]);

    return (
      <Calendar
        current={formatDate(currentDate)}
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={(day) => onDayPress(day?.dateString)}
        maxDate={formatDate(maxDate)}
        minDate={formatDate(minDate)}
        // renderHeader={renderCustomHeader}
        theme={theme}
        futureScrollRange={futureScrollRange}
        pastScrollRange={pastScrollRange}
      />
    );
  }
);

const theme = {
  'stylesheet': {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3',
        },
      },
    },
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8,
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800',
    },
  },
};

export default PickerTimeField;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  year: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    paddingRight: 5,
  },
  date: {},
});

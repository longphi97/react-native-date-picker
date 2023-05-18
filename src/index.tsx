import React, { useState } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ModalDayPicker from './ModalFilterDay';

export interface PropsDateSelected {
  fromDate?: string;
  toDate?: string;
  id?: number | string;
  key: string;
  name?: string;
}
export interface PropsDateRange {
  dateSelected: any;
  setDateSelected: any;
  types: 'both' | 'dateRange' | 'flexibleDate';
  onChangeDay?: any;
  dataFlexible?: any[];
  timeInit: any;
}

function DateRangePicker({
  timeInit,
  dateSelected,
  setDateSelected,
  dataFlexible,
  types,
}: PropsDateRange) {
  const [modalDayPicker, setModalDayPicker] = useState<boolean>(false);
  const onChangeDay = (data: any) => {
    setDateSelected(data);
  };

  return (
    <>
      <ModalDayPicker
        onChangeDay={onChangeDay}
        types={types}
        timeInit={timeInit}
        setModalDayPicker={setModalDayPicker}
        modalDayPicker={modalDayPicker}
        dataFlexible={dataFlexible}
      />
      <TouchableOpacity
        style={styles.dayBtn}
        activeOpacity={0.8}
        onPress={() => setModalDayPicker(true)}
      >
        <View style={styles.box}>
          {dateSelected ? (
            <Text>
              {dateSelected?.fromDate
                ? `${dateSelected?.fromDate} - ${dateSelected?.toDate}`
                : `${dateSelected?.name}`}
            </Text>
          ) : (
            <Text style={[styles.input]}>Chọn ngày</Text>
          )}
        </View>

        <View style={styles.icon} />
      </TouchableOpacity>
    </>
  );
}

const { width: wWidth, height: wHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalView: {
    width: wWidth,
    height: wHeight,
  },
  btnBottomModal: {
    width: wWidth * 0.9,
    height: 0.05 * wHeight,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBtn: {
    width: '100%',
    marginVertical: 20,
    height: 0.05 * wHeight,
    flexDirection: 'row',
    borderWidth: 0.7,
    borderRadius: 5,
  },
  wrapTextinput: {
    height: 0.05 * wHeight,
    flexDirection: 'row',
    borderWidth: 0.7,
    borderRadius: 5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    color: '#73797f',
  },
  input: {
    paddingHorizontal: 12,
    color: '#73797f',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default DateRangePicker;

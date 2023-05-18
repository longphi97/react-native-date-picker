/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import PickerTimeField from './CalendarListScreen';
import Flexible from './ChooseFlexible';
import Segment from './SegmentControl';

interface Props {
  setModalDayPicker: any;
  modalDayPicker: any;
  onChangeDay: any;
  dataFlexible?: any;
  timeInit: any;
  types: 'both' | 'dateRange' | 'flexibleDate';
}

const segments = [
  {
    title: 'Chọn khoảng ngày',
  },
  {
    title: 'Chọn linh hoạt',
  },
];
const width = Dimensions.get('window').width;

const ModalDayPicker = ({
  setModalDayPicker,
  modalDayPicker,
  onChangeDay,
  dataFlexible,
  timeInit,
  types,
}: Props) => {
  const [flexibleDate, setFlexibleDate] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const [segmentSelected, setSegment] = useState<number>(
    timeInit?.id === 0 ? 0 : 1
  );
  const [validateSubmit, setValidateSubmit] = useState<any>('');

  useEffect(() => {
    if (segmentSelected === 0) {
      setFlexibleDate(null);
    } else {
      setDateRange(null);
    }
  }, [segmentSelected]);

  useEffect(() => {
    if (timeInit?.id === 0) {
      setDateRange(timeInit);
    } else {
      setFlexibleDate(timeInit);
    }
  }, [timeInit]);

  const getDateRange = (data: any) => {
    setDateRange(data);
  };

  const getFlexibleDate = (data: any) => {
    setFlexibleDate(data);
  };

  const handleSubmit = () => {
    if (!dateRange && !flexibleDate) {
      setValidateSubmit('Vui lòng chọn ngày');
      return;
    }
    if (dateRange && segmentSelected === 0) {
      onChangeDay({
        id: 0,
        key: 'range_of_dates',
        name: 'Tuỳ chọn',
        ...dateRange,
      });
    }
    if (flexibleDate && segmentSelected === 1) {
      onChangeDay(flexibleDate);
    }
    setValidateSubmit('');
    setModalDayPicker(false);
  };

  const renderDateOptions = () => {
    if (types === 'both') {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          {segmentSelected === 0 ? (
            <PickerTimeField dataSelected={dateRange} getDate={getDateRange} />
          ) : (
            <Flexible
              arr={dataFlexible}
              defaultCheck={flexibleDate}
              dataFlexible={getFlexibleDate}
            />
          )}
        </View>
      );
    } else if (types === 'dateRange') {
      return (
        <View>
          <PickerTimeField getDate={getDateRange} />
        </View>
      );
    } else if (types === 'flexibleDate') {
      return (
        <View>
          <Flexible dataFlexible={getFlexibleDate} />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalDayPicker}
      onRequestClose={() => {
        setModalDayPicker(!modalDayPicker);
        setValidateSubmit('');
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ zIndex: 100, flex: 1, marginTop: 10 }}>
          <View
            style={{
              height: types === 'both' ? 110 : 50,
            }}
          >
            <View>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    setValidateSubmit('');
                    setModalDayPicker(!modalDayPicker);
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.titleText}>Trở về</Text>
                </TouchableOpacity>
                <Text style={styles.titleText}>Bộ lọc ngày</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.titleText}>Chọn</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.textFill}>{validateSubmit}</Text>
              </View>
            </View>

            {types === 'both' && (
              <View
                style={{
                  backgroundColor: '#ffffff',
                }}
              >
                <View style={styles.Wrapsegment}>
                  <Segment
                    segment={segments}
                    activeTab={segmentSelected}
                    activeStyle={{
                      borderRadius: 20,
                      backgroundColor: '#ffffff',
                    }}
                    textStyle={styles.text}
                    textActiveStyle={styles.text}
                    style={styles.segment}
                    onPress={(item: any) => {
                      setSegment(item.index);
                    }}
                  />
                </View>
              </View>
            )}
          </View>
          {renderDateOptions()}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  titleWrapper: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
  },
  Wrapsegment: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  segment: {
    width: width - 32,
    borderRadius: 20,
    height: 44,
    backgroundColor: '#F1F2F6',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 10,
  },
  textFill: {
    color: 'red',
    fontWeight: '400',
    marginRight: 16,
  },
});

export default ModalDayPicker;

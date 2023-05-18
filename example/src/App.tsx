import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import DateRangePicker from 'react-native-date-picker';

export default function App() {
  const [dateSelected, setDateSelected] = React.useState();
  const [timeInit, setTimeInit] = React.useState<any>();
  return (
    <View style={styles.container}>
      <Text>Result:</Text>
      <TouchableOpacity
        onPress={() =>
          setTimeInit({ id: 5, key: '14days_ago', name: '14 ngày qua' })
        }
      >
        <Text>SettimeInit</Text>
      </TouchableOpacity>
      <DateRangePicker
        timeInit={timeInit}
        {...{ dateSelected, setDateSelected }}
        types="both"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

import FilterCheck from './FilterC';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {
  dataFlexible?: any;
  defaultCheck?: any;
  arr?: any[];
}

const Flexible = ({
  dataFlexible,
  defaultCheck,
  arr = [
    {
      id: 1,
      key: null,
      name: 'Tất cả',
    },
    {
      id: 2,
      key: 'today',
      name: 'Hôm nay',
    },
    {
      id: 3,
      key: 'yesterday',
      name: 'Hôm qua',
    },
    {
      id: 4,
      key: '7days_ago',
      name: '7 ngày qua',
    },
    {
      id: 5,
      key: '14days_ago',
      name: '14 ngày qua',
    },
    {
      id: 6,
      key: 'this_month',
      name: 'Tháng này',
    },
    {
      id: 7,
      key: 'last_month',
      name: 'Tháng trước',
    },
  ],
}: Props) => {
  const [checkStatus, setCheckStatus] = useState<any>(defaultCheck || null);
  return (
    <ScrollView style={styles.container}>
      {arr.map((item: any) => {
        return (
          <FilterCheck
            key={item.id}
            title={item.name}
            check={item.id === checkStatus?.id}
            onPress={() => {
              setCheckStatus(item);
              dataFlexible(item);
            }}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f6',
    paddingHorizontal: 12,
  },
});

export default Flexible;

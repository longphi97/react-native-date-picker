/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface Props {
  title: string;
  check: boolean;
  typeIcon?: any;
  nameIcon?: string;
  onPress?: () => void;
  component?: ReactNode;
  sizeText?: number;
  borderCheck?: boolean;
}

const FilterCheck = (props: Props) => {
  const {
    title,
    check,
    sizeText = 14,
    onPress,
    borderCheck,
    component,
  } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.wrap, { borderWidth: borderCheck ? 0.3 : 0 }]}>
          {component && <View>{component}</View>}

          <Text
            style={{
              fontSize: sizeText,
              color: check ? 'green' : 'black',
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderColor: '#E4E4E4',
    borderRadius: 8,
  },
});

export default FilterCheck;

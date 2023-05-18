/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import type { RefObject } from './type';

interface Props {
  titleId?: string;
  // segment: { title: string; icon?: JSX.Element }[];
  segment: any[];

  activeTab: number;
  style?: ViewStyle | TextStyle | any;
  onPress?: (value: { name: string; index: number }) => void;
  activeStyle?: ViewStyle | any;
  textStyle?: TextStyle | any;
  textActiveStyle?: TextStyle | any;
  duration?: number;
}

const Segment = forwardRef(
  (
    {
      segment,
      activeTab = 0,
      style,
      activeStyle,
      textStyle,
      onPress,
      textActiveStyle,
      duration = 300,
      titleId = 'title',
    }: Props,
    ref: Ref<RefObject & any>
  ) => {
    const [segmentWidth, setSegmentWidth] = React.useState(0);
    const [active, setActive] = React.useState(activeTab);

    const widthSegment = (
      segmentArr: { title: string; icon?: JSX.Element | undefined }[],
      width: string | number | undefined = Dimensions.get('window').width
    ): { width: number } => {
      if (typeof width === 'number') {
        return {
          width: width / segmentArr.length,
        };
      } else {
        return { width: 0 };
      }
    };
    const heightSegment = (height: string | number | undefined) => {
      return (
        typeof height === 'number' && {
          height: height - 4,
        }
      );
    };

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      const widthFirst = widthSegment(segment, style?.width);
      const { width } = widthFirst;
      setSegmentWidth(width);
    }, [segment, style?.width]);

    React.useEffect(() => {
      if (active > 0) {
        translateXAnim(active);
      }
    });

    const translateXAnim = (index: number) => {
      Animated.timing(fadeAnim, {
        toValue: segmentWidth * index,
        easing: Easing.out(Easing.quad),
        duration: duration,
        useNativeDriver: true,
      }).start();
    };
    useImperativeHandle(ref, () => ({
      updateActive: (index: number = 0) => {
        translateXAnim(index);
        setActive(index);
      },
    }));

    return (
      <View style={[styles.container, { ...style }]}>
        <View style={{ margin: 2 }}>
          <View style={styles.wrap}>
            {segment.map((s, i) => {
              return (
                <TouchableWithoutFeedback
                  ref={ref}
                  key={i}
                  onPress={() => {
                    const value = {
                      ...s,
                      name: s[titleId],
                      index: i,
                    };
                    translateXAnim(i);
                    setActive(i);
                    typeof onPress === 'function' && onPress(value);
                  }}
                >
                  <View
                    style={[
                      styles.button,
                      widthSegment(segment, style?.width),
                      heightSegment(style?.height),
                    ]}
                  >
                    <View key={i} style={styles.wrapper}>
                      {s.icon}
                      <Text style={active === i ? textActiveStyle : textStyle}>
                        {s[titleId]}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          <Animated.View
            style={[
              styles.animation,
              {
                backgroundColor: '#F1F2F6',
                transform: [{ translateX: fadeAnim }],
                width: segmentWidth - 8,
              },
              activeStyle,
            ]}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 10,
    zIndex: 999,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  container: { backgroundColor: '#dddddd' },
  button: {
    flexDirection: 'row',
  },
  animation: {
    position: 'absolute',
    borderRadius: 7,
    top: 2,
    bottom: 2,
    right: 2,
    left: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    zIndex: 1,
  },
});
export default Segment;

# react-native-date-picker

date-picker

## Installation

```sh
npm install react-native-date-picker-option
```

## Usage

```js
import DateRangePicker from 'react-native-date-picker-option';
        <DateRangePicker
          timeInit={timeInit}
          {...{dateSelected, setDateSelected}}
          types="both"
        />

// ...
```

## Prop

# type: both | dateRange | flexibleDate;
* dateRange: Có thể chọn khoảng ngày từ bao nhiêu trên lịch
* flexibleDate: Các mốc thời gian được chọn. Ví dụ 7 ngày trước, 3 ngày trước, 1 tháng trước.
* Đối với flexibleDate có thể dùng truyền data vào bằng prop dataFlexible
* Data mặc đinh của dataFlexible là : 
- [
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
  ]
* both: có thể kết hợp dùng 1 trong 2 trường hợp của dateRange và flexibleDate
# dateSelected và setDateSelected dùng useState để kết hợp lấy data xuất và init data.
# timeInit: thời gian mặc định ban đầu muốn truyền vào.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

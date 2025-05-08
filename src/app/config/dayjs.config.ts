/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Configures `dayjs` to work with timezone and local time support.
 *
 * Plugins used:
 * - `utc`: Supports conversion between different timezones.
 * - `timezone`: Supports setting and converting timezones for `dayjs`.
 *
 * - `dayjs.tz.guess()`: Detects the user's timezone from the browser.
 * - `dayjs.tz.setDefault()`: Sets the default timezone for the application.
 *
 * After configuration, you can use `dayjs` to handle local time and timezone globally in the app.
 *
 * You no longer need to use `.tz()` as the timezone is set automatically.
 *
 * Example usage:
 * - `customDayjs()` will automatically return the local time (based on the default timezone set).
 * - `customDayjs('2025-05-07')` will format the date according to default format.
 * - `customDayjs(1622489133000)` will format the timestamp according to default format.
 * - `customDayjs('2025-05-07').format('DD/MM/YYYY')` will return a custom format.
 */

//  // Sử dụng customDayjs giống dayjs bình thường
//  console.log(customDayjs('2025-05-07').format()); // Sử dụng format mặc định (ví dụ: '07/05/2025 00:00')
//  console.log(customDayjs('2025-05-07').format('DD/MM/YYYY')); // Sử dụng format tùy chỉnh ('07/05/2025')
//  console.log(customDayjs('2025-05-07').add(1, 'day').format()); // Sử dụng format mặc định cho ngày sau khi cộng thêm 1 ngày
//  console.log(customDayjs('2025-05-07').isBefore(customDayjs('2025-05-08'))); // true
//  console.log(customDayjs(1622489133000).format()); // Sử dụng format mặc định (ví dụ: '27/05/2021 14:25')

//  // Nếu bạn muốn sử dụng hàm format trực tiếp
//  console.log(formattedCustomDayjs('2025-05-07')); // Sử dụng format mặc định
//  console.log(formattedCustomDayjs('2025-05-07', 'DD/MM/YYYY')); // Sử dụng format tùy chỉnh

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DATE_TIME_FORMAT } from '@app/constants/date-format';

// Register necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set the default timezone for the app based on the user's browser timezone
dayjs.tz.setDefault(dayjs.tz.guess());

// Custom dayjs function that automatically applies the default timezone and supports all dayjs methods
const customDayjs = (...args: any[]) => {
   // Create the dayjs instance with the input arguments and set the default timezone
   const date = dayjs(...args).tz(dayjs.tz.guess(), true);

   // Return the dayjs instance itself, allowing usage of all dayjs methods
   return date;
};

// Override the format method to apply the default format if no format is provided
const formatWithDefault = (date: dayjs.Dayjs, format?: string): string => {
   return date.format(format || DATE_TIME_FORMAT); // If no format provided, use the default
};

// To use format correctly, you can simply call .format on the dayjs object
const formattedCustomDayjs = (date: any, format?: string) => {
   return customDayjs(date).format(format);
};

export { customDayjs, formattedCustomDayjs, formatWithDefault };

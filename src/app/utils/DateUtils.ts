import * as moment from 'moment';

const DateUtils = {

  now() {
    return moment.now();
  },

  /**
   * 计算两个日期的间隔时间
   * @return 间隔时间 (days)
   * @param from 自（1970 年 1 月 1 日 12AM UTC）以来的毫秒数。
   * @param to 自（1970 年 1 月 1 日 12AM UTC）以来的毫秒数。
   */
  diffDays(from: number, to: number) {
    const oneDayInMillisecond = 1000 * 60 * 60 * 24;
    let diffInMillesecond = Math.abs(to - from);
    return Math.floor(diffInMillesecond / oneDayInMillisecond);
  }
}

export default DateUtils;



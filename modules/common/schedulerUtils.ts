export type SchedulerTitle = {
  title: string
}

export type SchedulerLabel = {
  label: string
}

export type SchedulerTimeBlock = {
  startDate: number;
  endDate?: number;
  state: ScheduleState
}

export type ActiveScheduleType = {
  [key: number]: SchedulerTimeBlock
}

export type DayHour = SchedulerTitle | SchedulerLabel | SchedulerTimeBlock;

export enum ScheduleState {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  BOOKED= 'BOOKED',
  SELECTED = 'SELECTED',
}

const getHours = (daysOfWeek: Date[],  schedule: ActiveScheduleType) => {
  const hours = [] as DayHour[];
  let currentHour = 7;
  let currentMinute = 0;
  const options = { weekday: 'long', month: 'short', day: 'numeric' };

  for (let i = 0; i < 8; i++) {
    hours.push({
      title: i > 0 ? daysOfWeek[i - 1].toLocaleDateString('tr-TR', options) : ''
    });
  }

  while (currentHour < 24) {
    const hourAsString = currentHour < 10 ? `0${currentHour}` : currentHour.toString();
    const minuteAsString = currentMinute === 0 ? '00' : '30';
    const label = `${hourAsString}:${minuteAsString}`;

    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        hours.push({label});
        continue;
      }

      const startDate = new Date(daysOfWeek[i - 1]);
      startDate.setHours(currentHour, currentMinute, 0, 0);

      const endDate = new Date(startDate);
      endDate.setMinutes(startDate.getMinutes() + 30);
      console.log("startDate.getTime()", startDate.getTime())
      const currentScheduledTime = schedule[startDate.getTime()];


      hours.push({
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        state: currentScheduledTime ? currentScheduledTime.state :  ScheduleState.NOT_AVAILABLE
      });
    }

    if (currentMinute === 0) {
      currentMinute = 30;
    } else {
      currentMinute = 0;
      currentHour++;
    }
  }
  return hours;
};

const getDatesForWeek = (date: Date) => {
  const firstDay = new Date(date);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

  const dates = [] as Date[];
  dates.push(firstDay);

  for (let i = 1; i < 7; i++) {
    const nextDay = new Date(firstDay);
    nextDay.setDate(nextDay.getDate() + i);
    dates.push(nextDay);
  }

  return dates;
};

export const getScheduleData = (date: Date, schedule: ActiveScheduleType) => {
  const daysOfWeek = getDatesForWeek(date);
  return getHours(daysOfWeek, schedule);

};
import { SchedulerTitle, DayHour, SchedulerLabel, SchedulerTimeBlock, ScheduleState } from "../../modules/common/schedulerUtils";
import cx from 'classnames';
import { TitleBox } from './TitleBox';
import { TimeBox } from './TimeBox';
import style from './scheduler.module.scss';

type SchedulerBoxProps = {
  timeBlock: DayHour;
}

export const SchedulerBox = ({timeBlock}:SchedulerBoxProps) => {
  if ((timeBlock as SchedulerTitle).title || (timeBlock as SchedulerTitle).title === '') {
    return <TitleBox>{(timeBlock as SchedulerTitle).title}</TitleBox>
  }

  if ((timeBlock as SchedulerLabel).label) {
    return <TimeBox>{(timeBlock as SchedulerLabel).label}</TimeBox>
  }

  const schedule = timeBlock as SchedulerTimeBlock;
  return (
    <div className={cx({
      'cursor-pointer': schedule.state === ScheduleState.SELECTED ||schedule.state === ScheduleState.AVAILABLE,
      'cursor-not-allowed': schedule.state === ScheduleState.NOT_AVAILABLE || schedule.state === ScheduleState.BOOKED,
      [style.notAvailable]: schedule.state === ScheduleState.NOT_AVAILABLE,
      [style.available]: schedule.state === ScheduleState.AVAILABLE,
      [style.booked]: schedule.state === ScheduleState.BOOKED,
      [style.selected]: schedule.state === ScheduleState.SELECTED,
    })}>
      ---
    </div>
  );
}

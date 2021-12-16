import style from './scheduler.module.scss';
import { ActiveScheduleType, getScheduleData } from '../../utils/schedulerUtils';
import { SchedulerBox } from './SchedulerBox';

type SchedulerProps = {
  date?: Date;
  schedule: ActiveScheduleType;
}

export const Scheduler = ({ 
  date = new Date(),
  schedule
}: SchedulerProps) => {

  return <div className={style.scheduler}>
    {getScheduleData(date, schedule).map((timeBlock, index) => (
      <SchedulerBox key={index} timeBlock={timeBlock} />
    ))}
  </div>;
}
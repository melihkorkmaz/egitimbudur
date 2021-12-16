import style from './scheduler.module.scss';
export const TimeBox = ({ children }: { children?: string }) => (
  <div className={style.timeCell}>
    <span>{children}</span>
  </div>
);
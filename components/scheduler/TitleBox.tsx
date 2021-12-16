import style from './scheduler.module.scss';
export const TitleBox = ({ children }: { children?: string }) => (
  <div className={style.titleCell}>
    <span>{children}</span>
  </div>
);
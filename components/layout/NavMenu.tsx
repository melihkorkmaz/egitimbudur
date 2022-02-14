import cx from 'classnames';
import style from './navmenu.module.scss';
import Link from 'next/link'

export const NavMenu = ({ className }) => {
  return (
    <ul className={cx('list-none flex items-center space-x-6 font-medium', style.navMenu, className)}>
      <li className="active">
        <Link href="/">
          Anasayfa
        </Link>
      </li>

      <li>
        <Link href="/teachers">Öğretmenler</Link>
      </li>

      <li>
        <a href="dashboard.html">İletişim</a>
      </li>
    </ul>
  );
};

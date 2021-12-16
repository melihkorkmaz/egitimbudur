import cx from 'classnames';
import style from './navmenu.module.scss';
import Link from 'next/link'

export const NavMenu = () => {
  return (
    <ul className={cx('nav-menu', style.navMenu)}>
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

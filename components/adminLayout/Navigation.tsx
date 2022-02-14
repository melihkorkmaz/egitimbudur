import cx from "classnames";
import Link from "next/link";

type NavigationProps = {
  activePage: string;
}
export const Navigation = ({
  activePage
}: NavigationProps) => {

  return (
    <div className="d-navigation">
      <ul id="side-menu">
        <li className={cx({ active: activePage === 'dashboard' })}>
          <Link href="/dashboard">
            <a>
              <i className="fas fa-th"></i>Anasayfa
            </a>
          </Link>
        </li>
        <li className={cx({ active: activePage === 'my-profile' })}>
          <Link href="/my-profile">
            <a>
              <i className="fas fa-th"></i>Profilim
            </a>
          </Link>
        </li>
        <li className={cx({ active: activePage === 'my-services' })}>
          <Link href="/my-services">
            <a>
              <i className="fas fa-th"></i>Ders Ucretleri
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
import Image from "next/image";
import cx from 'classnames';
import Logo from "../../public/img/logo.png";
import { Button } from '../Button';
import { NavMenu } from './NavMenu';
import Link from 'next/link'
import { useAuthentication } from "../../store/authentication/useAuthentication";
import { useEffect, useState } from "react";
import { AuthCurrentState } from "../../types/authentication";

type HeaderProps = {
  className?: string;
}

export const Header = ({
  className,
}: HeaderProps) => {
  const { authState } = useAuthentication();
  const [ scrolled, setScrolled ] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollChange);

    return () => {
      window.removeEventListener('scroll', handleScrollChange);
    }
  }, []);

  const handleScrollChange = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;    
    setScrolled(winScroll / height > 0);
  };

  return (
    <>
      <div className={cx('header dark-text', { 'header-fixed': scrolled }, className)}>
        <div className="container">
          <nav id="navigation" className="navigation navigation-landscape">
            <div className="nav-header">
              <Link href="/">
                <a className="nav-brand pb-0">
                  <Image src={Logo} className="logo" alt="" />
                </a>
              </Link>
              <div className="nav-toggle"></div>
              <div className="mobile_nav">
                <ul>
                  <li>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#login"
                      className="crs_yuo12 w-auto text-white theme-bg"
                    >
                      <span className="embos_45">
                        <i className="fas fa-sign-in-alt mr-1"></i>Sign In
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="nav-menus-wrapper">
              <NavMenu />
              {authState !== AuthCurrentState.AUTHENTICATED && (<ul className="nav-menu nav-menu-social align-to-right mt-3">
                <li>
                  <Button renderAs="a" href="/sign-in">
                    <i className="fas fa-sign-in-alt mr-1"></i>
                    <span className="dn-lg">Giriş</span>
                  </Button>
                </li>
                <li>
                  <Button renderAs="a" href="/sign-up" primary>Şimdi Kaydol!</Button>
                </li>
              </ul>)}
            </div>
          </nav>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

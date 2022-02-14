import Image from "next/image";
import cx from 'classnames';
import Logo from "../../public/img/logo.png";
import { NavMenu } from './NavMenu';
import Link from 'next/link'
import { useEffect, useState } from "react";
import { UserTopMenu } from "./UserTopMenu";
import styles from './header.module.scss';


type HeaderProps = {
  className?: string;
  homePage?: boolean;
}

export const Header = ({
  className,
  homePage
}: HeaderProps) => {
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

  const classes = cx(
    styles.header,
    {
      [styles.homePage]: homePage && !scrolled,
      [styles.headerScroll]: scrolled
    }
  );

  return (
    <>
      <div className={classes}>
        <div className="container mx-auto">
          <nav className="flex align-center h-[70px]">
            <div className="max-w-[240px] mr-10 flex items-center">
              <Link href="/">
                <a className="block mt-2">
                  <Image src={Logo} alt="" />
                </a>
              </Link>
            </div>
            <div className="flex justify-between flex-1 flex-row-reverse">
              <UserTopMenu />
              <NavMenu className="hidden lg:flex" />
            </div>
          </nav>
        </div>
      </div>
      <div className="clear-both"></div>
    </>
  );
};

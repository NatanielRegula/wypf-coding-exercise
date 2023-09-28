'use client';

import classNames from 'classnames';
import ContentWrapper from '../content_wrapper/ContentWrapper';
import styles from './Navbar.module.css';
import { useState } from 'react';
import HamburgerButton from './components/hamburgerButton/HamburgerButton';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileUlShown, setIsMobileUlShown] = useState(false);
  const currentRoute = usePathname();

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.isMobileUlShown]: isMobileUlShown,
      })}
    >
      <ContentWrapper fullHeight className={styles.contentWrapper}>
        <button
          aria-hidden
          aria-controls="primary-navigation"
          aria-expanded={isMobileUlShown}
          className={classNames(styles.overlay, {
            [styles.isMobileUlShown]: isMobileUlShown,
          })}
          onClick={() => setIsMobileUlShown(false)}
        />
        <div
          className={classNames(styles.linksContainer, {
            [styles.isMobileUlShown]: isMobileUlShown,
          })}
        >
          <ul id="primary-navigation">
            <li
              className={classNames({
                [styles.active]: currentRoute === '/',
              })}
            >
              <Link href="/">Home</Link>
            </li>

            <li
              className={classNames({
                [styles.active]: currentRoute === '/users',
              })}
            >
              <Link href="/users">Users</Link>
            </li>

            <li
              className={classNames({
                [styles.active]: currentRoute === '/albums',
              })}
            >
              <Link href="/albums">Albums</Link>
            </li>

            <li>
              <Link href="https://github.com/NatanielRegula/" target="_blank">
                Github
              </Link>
            </li>
          </ul>
        </div>
        <HamburgerButton
          className={styles.hamburgerButton}
          isMobileUlShown={isMobileUlShown}
          onClick={() => setIsMobileUlShown((oldValue) => !oldValue)}
          ariaControls="primary-navigation"
        />
      </ContentWrapper>
    </nav>
  );
}

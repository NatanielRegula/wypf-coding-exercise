'use client';

import classNames from 'classnames';
import ContentWrapper from '../content_wrapper/ContentWrapper';
import styles from './Navbar.module.css';
import { useState } from 'react';
import HamburgerButton from './components/hamburgerButton/HamburgerButton';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import ThemeToggle from './components/themeToggle/ThemeToggle';

export default function Navbar() {
  const [isMobileUlShown, setIsMobileUlShown] = useState(false);
  const currentRoute = usePathname();

  const internalLinks = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Users',
      url: '/users',
    },
    {
      label: 'Albums',
      url: '/albums',
    },
  ];

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
            <li>
              <ThemeToggle />
            </li>

            {internalLinks.map((link) => (
              <li
                className={classNames({
                  [styles.active]: currentRoute === link.url,
                })}
                key={`${link.url}-${link.label}`}
              >
                <Link onClick={() => setIsMobileUlShown(false)} href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="https://github.com/NatanielRegula/wypf-coding-exercise"
                target="_blank"
                onClick={() => setIsMobileUlShown(false)}
              >
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

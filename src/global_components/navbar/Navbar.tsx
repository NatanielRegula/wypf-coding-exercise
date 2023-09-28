'use client';

import classNames from 'classnames';
import ContentWrapper from '../content_wrapper/ContentWrapper';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import HamburgerButton from './components/hamburgerButton/HamburgerButton';

export default function Navbar() {
  const [isMobileUlShown, setIsMobileUlShown] = useState(false);
  const [isViewportScrolled, setInViewportScrolled] = useState(false);

  const handleScroll = () => setInViewportScrolled(window.scrollY >= 20);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.isViewportScrolled]: isViewportScrolled,
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
            [styles.isViewportScrolled]: isViewportScrolled,
          })}
        >
          <ul id="primary-navigation">
            <li className={styles.active}>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <HamburgerButton
          className={styles.hamburgerButton}
          scrolled={isViewportScrolled}
          isMobileUlShown={isMobileUlShown}
          onClick={() => setIsMobileUlShown((oldValue) => !oldValue)}
          ariaControls="primary-navigation"
        />
      </ContentWrapper>
    </nav>
  );
}

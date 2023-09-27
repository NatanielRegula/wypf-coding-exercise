import classNames from 'classnames';
import styles from './HamburgerButton.module.css';
import { MouseEventHandler } from 'react';

interface Props {
  scrolled: boolean;
  isMobileUlShown: boolean;
  onClick: MouseEventHandler;
  className?: string;
  ariaControls?: string;
}

export default function HamburgerButton(props: Props) {
  return (
    <button
      className={classNames(styles.hamburgerButton, {
        [styles.scrolled]: props.scrolled,
        [styles.showMobile]: props.isMobileUlShown,
        [props.className ?? '']: props.className != undefined,
      })}
      onClick={props.onClick}
      aria-label={props.isMobileUlShown ? 'Close main menu' : 'Open main menu'}
      aria-expanded={props.isMobileUlShown}
      aria-controls={props.ariaControls}
    >
      <div aria-hidden></div>
      <div aria-hidden></div>
      <div aria-hidden></div>
      <span className="srOnly">Main menu</span>
    </button>
  );
}

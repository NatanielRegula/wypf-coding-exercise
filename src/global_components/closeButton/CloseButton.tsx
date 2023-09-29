import classNames from 'classnames';
import styles from './CloseButton.module.css';
import { MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler;
  className?: string;
  ariaControls?: string;
  ariaLabel?: string;
  srOnlyLabel?: string;
}

export default function CloseButton(props: Props) {
  return (
    <button
      className={classNames(styles.closeButton, {
        [props.className ?? '']: props.className != undefined,
      })}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      aria-controls={props.ariaControls}
    >
      <div aria-hidden></div>
      <div aria-hidden></div>
      <span className="srOnly">{props.srOnlyLabel}</span>
    </button>
  );
}

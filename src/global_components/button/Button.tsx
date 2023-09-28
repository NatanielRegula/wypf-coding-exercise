import classNames from 'classnames';
import Link from 'next/link';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { UrlObject } from 'url';
import styles from './Button.module.css';

interface Props {
  children?: ReactNode;
  className?: string;
  id?: string;
  primary?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  visuallyDisabled?: boolean;
  functionalityDisabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface PropsButton extends Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  className = '',
  id,
  primary = false,
  outline = false,
  fullWidth = false,
  visuallyDisabled = false,
  functionalityDisabled = false,
  type,
  onClick,
}: PropsButton) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        type={type}
        id={id}
        disabled={functionalityDisabled}
        className={classNames(className, styles.button, {
          [styles.primary]: primary,
          [styles.outline]: outline,
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: visuallyDisabled,
        })}
      >
        {children}
      </button>
    </div>
  );
};

interface PropsLink extends Props {
  href: string | UrlObject;
}

interface PropsLinkText {
  children?: ReactNode;
  className?: string;
  id?: string;
  visuallyDisabled?: boolean;
  functionalityDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href: string | UrlObject;
}

export const ButtonLink = ({
  children,
  className = '',
  id,
  primary = false,
  outline = false,
  fullWidth = false,
  visuallyDisabled = false,
  functionalityDisabled = false,
  href,
}: PropsLink) => {
  return (
    <div className={styles.wrapper}>
      <Link
        href={functionalityDisabled ? '' : href}
        id={id}
        className={classNames(className, styles.button, {
          [styles.primary]: primary,
          [styles.fullWidth]: fullWidth,
          [styles.outline]: outline,
          [styles.disabled]: visuallyDisabled,
        })}
      >
        {children}
      </Link>
    </div>
  );
};

export const ButtonLinkText = ({
  children,
  className = '',
  id,
  visuallyDisabled = false,
  functionalityDisabled = false,
  href,
}: PropsLinkText) => {
  if (functionalityDisabled) {
    return (
      <div className={styles.wrapper}>
        <div
          className={classNames(className, styles.textLink, {
            [styles.disabled]: visuallyDisabled,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <Link
        href={functionalityDisabled ? '' : href}
        id={id}
        className={classNames(className, styles.textLink, {
          [styles.disabled]: visuallyDisabled,
        })}
      >
        {children}
      </Link>
    </div>
  );
};

export default Button;

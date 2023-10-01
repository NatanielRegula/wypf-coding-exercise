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
  );
};

interface PropsLink extends Props {
  href: string | UrlObject;
  prefetch?: boolean;
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
  prefetch = true,
  href,
}: PropsLink) => {
  return (
    <Link
      prefetch={prefetch}
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
      <div
        className={classNames(className, styles.textLink, {
          [styles.disabled]: visuallyDisabled,
        })}
      >
        {children}
      </div>
    );
  }
  return (
    <Link
      href={functionalityDisabled ? '' : href}
      id={id}
      className={classNames(className, styles.textLink, {
        [styles.disabled]: visuallyDisabled,
      })}
    >
      {children}
    </Link>
  );
};

export default Button;

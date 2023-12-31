import { ReactNode } from 'react';
import styles from './ContentWrapper.module.css';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

export default function ContentWrapper(props: Props) {
  return (
    <div
      id={props.id}
      className={classNames({
        [styles.contentWrapper]: true,
        [styles.fullHeight]: props.fullHeight,
      })}
    >
      <div
        id={props.id}
        className={classNames({
          [props.className ?? '']: props.className != undefined,
          [styles.fullHeight]: props.fullHeight,
        })}
      >
        {props.children}
      </div>
    </div>
  );
}

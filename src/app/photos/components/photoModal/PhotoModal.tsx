import classNames from 'classnames';
import styles from './PhotoModal.module.css';
import Image from 'next/image';
import CloseButton from '@/global_components/closeButton/CloseButton';
import { MouseEventHandler } from 'react';
import LabeledValue from '@/global_components/labeledValue/LabeledValue';

interface Props {
  url: string;
  title: string;
  show: boolean;
  onCloseClick: MouseEventHandler;
}

export default function PhotoModal(props: Props) {
  return (
    <div
      className={classNames(styles.photoModalBackground, {
        [styles.show]: props.show,
      })}
      onClick={props.onCloseClick}
    >
      {props.show && (
        <div className={styles.photoModal}>
          <div className={styles.imageContainer}>
            <Image
              width={600}
              height={600}
              src={props.url}
              alt={`Photo album piece titled ${props.title}`}
            />
          </div>
          <div className={styles.bottomBar}>
            <LabeledValue
              className={styles.albumTitle}
              label={'Title'}
              value={props.title}
            />
            <CloseButton
              onClick={props.onCloseClick}
              ariaLabel="close image modal"
              srOnlyLabel="close image modal"
            />
          </div>
        </div>
      )}
    </div>
  );
}

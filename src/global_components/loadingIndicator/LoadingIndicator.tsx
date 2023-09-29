import classNames from 'classnames';
import styles from './LoadingIndicator.module.css';

interface Props {
  loading?: boolean;
}

export default function LoadingIndicator({ loading = true }: Props) {
  return (
    <div
      aria-hidden
      className={classNames(styles.loadingIndicator, {
        [styles.stoppedLoading]: !loading,
      })}
    ></div>
  );
}

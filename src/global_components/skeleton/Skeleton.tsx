import { useMemo } from 'react';
import styles from './Skeleton.module.css';

interface Props {
  quantity: number;
}

export default function SkeletonBars(props: Props) {
  const keys = useMemo(
    () =>
      Array.from({ length: props.quantity }, (_, index) => `skeleton${index}`),
    [props.quantity]
  );

  return (
    <>
      {keys.map((i) => (
        <div className={styles.bar} key={i} />
      ))}
    </>
  );
}

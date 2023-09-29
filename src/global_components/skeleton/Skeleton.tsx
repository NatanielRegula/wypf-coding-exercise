import styles from './Skeleton.module.css';

interface Props {
  quantity: number;
}

export default function SkeletonBars(props: Props) {
  return (
    <>
      {[...Array(props.quantity)].map((i) => (
        <div className={styles.bar} key={i} />
      ))}
    </>
  );
}

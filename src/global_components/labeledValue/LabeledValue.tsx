import classNames from 'classnames';
import styles from './LabeledValue.module.css';

interface Props {
  label: string;
  value: string;
  primary?: boolean;
  alignEnd?: boolean;
}

export default function LabeledValue({
  label,
  value,
  primary = false,
  alignEnd = false,
}: Props) {
  return (
    <div
      className={classNames(styles.labeledValue, {
        [styles.primary]: primary,
        [styles.alignEnd]: alignEnd,
      })}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

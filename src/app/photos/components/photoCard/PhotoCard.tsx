import Image from 'next/image';
import styles from './PhotoCard.module.css';
import LabeledValue from '@/global_components/labeledValue/LabeledValue';

interface Props {
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function PhotoCard(props: Props) {
  return (
    <div className={styles.photoCard}>
      <div className={styles.imageContainer}>
        <Image
          width={150}
          height={150}
          src={props.thumbnailUrl}
          alt={`Photo album piece titled ${props.title}`}
        />
      </div>
      <div className={styles.information}>
        <LabeledValue
          className={styles.albumTitle}
          label={'Title'}
          value={props.title}
        />
      </div>
    </div>
  );
}

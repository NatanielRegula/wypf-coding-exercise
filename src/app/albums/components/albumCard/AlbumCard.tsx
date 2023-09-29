import styles from './AlbumCard.module.css';
import { ButtonLink } from '@/global_components/button/Button';
import ChevronSvg from '@/global_components/chevronSvg/ChevronSvg';
import LabeledValue from '@/global_components/labeledValue/LabeledValue';

interface Props {
  albumTitle: string;
  userName: string;
  userId: number;
  albumId: number;
}

export default function AlbumCard(props: Props) {
  return (
    <div className={styles.albumCard}>
      <div className={styles.primaryInformation}>
        <LabeledValue
          className={styles.albumTitle}
          label={'Name'}
          value={props.albumTitle}
          primary
        />

        <div className={styles.endSection}>
          <LabeledValue
            label={'By User'}
            value={props.userName}
            className={styles.labeledValue}
          />
          <ButtonLink
            className={styles.btn}
            href={`/photos?albumId=${props.albumId.toString()}&userId=${props.userId.toString()}`}
          >
            <span>View Album</span>

            <ChevronSvg />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

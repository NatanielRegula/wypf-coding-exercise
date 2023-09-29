import styles from './AlbumCard.module.css';
import { ButtonLink } from '@/global_components/button/Button';
import LabeledValue from '@/global_components/labeledValue/LabeledValue';

interface Props {
  albumTitle: string;
  userName: string;
  userId: number;
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
          <ButtonLink className={styles.showHideDetailBtn} href={'/album/'}>
            <span>View Album</span>

            <svg
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.76766 19.8134H21.7677C21.9499 19.8128 22.1285 19.7626 22.2843 19.668C22.4401 19.5735 22.5672 19.4382 22.6519 19.2768C22.7365 19.1155 22.7755 18.934 22.7648 18.7521C22.754 18.5702 22.6938 18.3947 22.5907 18.2444L13.5907 5.2444C13.2177 4.7054 12.3197 4.7054 11.9457 5.2444L2.94566 18.2444C2.84149 18.3943 2.7804 18.57 2.76903 18.7522C2.75766 18.9344 2.79645 19.1163 2.88118 19.278C2.96591 19.4397 3.09334 19.5752 3.24963 19.6695C3.40592 19.7639 3.58508 19.8137 3.76766 19.8134Z"
                fill="#FF6D02"
              />
            </svg>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

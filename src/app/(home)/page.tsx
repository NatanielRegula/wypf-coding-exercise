import ContentWrapper from '@/global_components/content_wrapper/ContentWrapper';
import styles from './page.module.css';
import { ButtonLink } from '@/global_components/button/Button';

export default function Home() {
  return (
    <main className={styles.page}>
      <ContentWrapper fullHeight className={styles.contentWrapper}>
        <h1>WYPF Coding Exercise</h1>
        <p className={styles.subheading}>by Nataniel Regula</p>
        <div className={styles.ctaWrapper}>
          <ButtonLink href={'/users'}>Users</ButtonLink>
          <ButtonLink href={'/albums'}>Albums</ButtonLink>
        </div>
      </ContentWrapper>
    </main>
  );
}

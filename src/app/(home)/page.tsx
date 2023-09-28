import Navbar from '../../global_components/navbar/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main id="main">
        <span>placeholder</span>
      </main>
    </div>
  );
}

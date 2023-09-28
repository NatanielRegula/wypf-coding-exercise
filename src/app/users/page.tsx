import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';
import UserCard from './components/userCard/UserCard';
import styles from './page.module.css';

export default function Users() {
  return (
    <main className={styles.page}>
      <ContentWrapper>
        <div className={styles.list}>
          <UserCard
            fullName={'John Doe'}
            userName={'John D'}
            emailAddress={'johndoe@example.com'}
            phoneNumber={'+44 8903993098'}
            userId={1}
          />
          <UserCard
            fullName={'John Doe'}
            userName={'John D'}
            emailAddress={'johndoe@example.com'}
            phoneNumber={'+44 8903993098'}
            userId={1}
          />
          <UserCard
            fullName={'John Doe'}
            userName={'John D'}
            emailAddress={'johndoe@example.com'}
            phoneNumber={'+44 8903993098'}
            userId={1}
          />
        </div>
      </ContentWrapper>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';

import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';
import UserCard from './components/userCard/UserCard';

import styles from './page.module.css';

import { User } from '../api/users/types';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const usersResponse = await fetch('/api/users');
    const usersResponseJson = await usersResponse.json();
    setUsers(usersResponseJson);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className={styles.page}>
      <ContentWrapper>
        <div className={styles.list}>
          {users.map((user) => (
            <UserCard
              fullName={user.name}
              userName={user.username}
              emailAddress={user.email}
              phoneNumber={user.phone}
              userId={user.id}
              key={user.id}
            />
          ))}
        </div>
      </ContentWrapper>
    </main>
  );
}

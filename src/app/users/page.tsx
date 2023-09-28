'use client';

import { useEffect, useState } from 'react';

import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';
import UserCard from './components/userCard/UserCard';

import styles from './page.module.css';

import { User } from '../api/users/types';
import Navbar from '@/global_components/navbar/Navbar';

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
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        <h1>Users list</h1>
        <div className={styles.list}>
          {users.map((user) => (
            <UserCard
              fullName={user.name}
              userName={user.username}
              emailAddress={user.email}
              phoneNumber={user.phone}
              userId={user.id}
              location={user.address}
              key={user.id}
            />
          ))}
        </div>
      </ContentWrapper>
    </main>
  );
}

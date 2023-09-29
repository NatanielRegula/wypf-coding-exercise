'use client';

import { useEffect, useState } from 'react';

import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';

import styles from './page.module.css';

import Navbar from '@/global_components/navbar/Navbar';
import AlbumCard from './components/albumCard/AlbumCard';
import { Album } from '../api/albums/types';
import { User } from '../api/users/types';

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const usersResponse = await fetch('/api/users');
    const usersResponseJson = await usersResponse.json();
    setUsers(usersResponseJson);
  };

  const getAlbums = async () => {
    const usersResponse = await fetch('/api/albums');
    const usersResponseJson = await usersResponse.json();
    setAlbums(usersResponseJson);
  };

  useEffect(() => {
    getAlbums();
    getUsers();
  }, []);

  return (
    <main className={styles.page}>
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        <h1>Albums list</h1>
        <div className={styles.list}>
          {albums.map((album) => (
            <AlbumCard
              albumTitle={album.title}
              userName={
                users.find((user) => user.id === album.userId)?.username ??
                'Unknown'
              }
              userId={album.userId}
              key={album.id}
            />
          ))}
        </div>
      </ContentWrapper>
    </main>
  );
}

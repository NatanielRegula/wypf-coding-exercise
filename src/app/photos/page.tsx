'use client';

import { useEffect, useState } from 'react';

import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';

import styles from './page.module.css';

import Navbar from '@/global_components/navbar/Navbar';
import { User } from '../api/users/types';
import { Photo } from '../api/photos/types';
import PhotoCard from './components/photoCard/PhotoCard';
import LoadingIndicator from '@/global_components/loadingIndicator/LoadingIndicator';

export default function Photos({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = searchParams['userId'] ?? '';
  const albumId = searchParams['albumId'] ?? '';

  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const getUser = async () => {
    const usersResponse = await fetch(`/api/users?userId=${userId}`);

    const usersResponseJson: User[] = await usersResponse.json();

    setUser(usersResponseJson[0]);
  };

  const getPhotos = async () => {
    const photosResponse = await fetch(`/api/photos?albumId=${albumId}`);

    const photosResponseJson = await photosResponse.json();

    setPhotos(photosResponseJson);
  };

  useEffect(() => {
    getUser();
    getPhotos();
  }, []);

  return (
    <main className={styles.page}>
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        <LoadingIndicator loading={photos.length === 0} />

        <h1>
          View Images: <span>{user?.username}</span>
        </h1>

        <div className={styles.photos}>
          {photos.map((photo) => (
            <PhotoCard
              title={photo.title}
              url={photo.url}
              thumbnailUrl={photo.thumbnailUrl}
              key={photo.id}
            />
          ))}
        </div>
      </ContentWrapper>
    </main>
  );
}

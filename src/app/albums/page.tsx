'use client';

import { useEffect, useState } from 'react';

import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';

import styles from './page.module.css';

import Navbar from '@/global_components/navbar/Navbar';
import AlbumCard from './components/albumCard/AlbumCard';
import { Album, AlbumsApiResponse } from '../api/albums/types';
import { User } from '../api/users/types';
import LoadingIndicator from '@/global_components/loadingIndicator/LoadingIndicator';
import Button from '@/global_components/button/Button';
import classNames from 'classnames';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ChevronSvg from '@/global_components/chevronSvg/ChevronSvg';

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pagesCount, setPagesCount] = useState(10);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const itemsPerPage = searchParams.get('itemsPerPage') ?? '10';
  const currentPage = searchParams.get('page') ?? '1';

  const getUsers = async () => {
    const usersResponse = await fetch('/api/users');
    const usersResponseJson = await usersResponse.json();
    setUsers(usersResponseJson);
  };

  const getAlbums = async () => {
    const albumsResponse = await fetch(
      `/api/albums?itemsPerPage=${itemsPerPage}&page=${currentPage}`
    );

    const albumsResponseJson: AlbumsApiResponse = await albumsResponse.json();

    setHasPrevPage(albumsResponseJson.hasPrevPage);
    setHasNextPage(albumsResponseJson.hasNextPage);
    setPagesCount(albumsResponseJson.pagesCount);
    setAlbums(albumsResponseJson.data);

    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    );
    params.set('page', albumsResponseJson.currentPage.toString());
    params.set('itemsPerPage', albumsResponseJson.itemsPerPage.toString());

    router.push(pathname + '?' + params.toString());
  };

  useEffect(() => {
    Promise.all([getAlbums(), getUsers()]);
  }, [itemsPerPage, currentPage]);

  return (
    <main className={styles.page}>
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        <LoadingIndicator loading={albums.length === 0 || users.length === 0} />

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
              albumId={album.id}
              key={album.id}
            />
          ))}
        </div>
        <div className={styles.filters}>
          <Button
            className={styles.btn}
            onClick={() => {
              const params = new URLSearchParams(
                searchParams as unknown as URLSearchParams
              );
              params.set('page', (parseInt(currentPage) - 1).toString());

              router.push(pathname + '?' + params.toString());
            }}
            visuallyDisabled={!hasPrevPage}
            functionalityDisabled={!hasPrevPage}
          >
            <ChevronSvg />
            <span>Priv</span>
          </Button>
          <span>{`${currentPage} / ${pagesCount}`}</span>
          <Button
            className={classNames(styles.btn, styles.next)}
            onClick={() => {
              const params = new URLSearchParams(
                searchParams as unknown as URLSearchParams
              );
              params.set('page', (parseInt(currentPage) + 1).toString());

              router.push(pathname + '?' + params.toString());
            }}
            visuallyDisabled={!hasNextPage}
            functionalityDisabled={!hasNextPage}
          >
            <span>Next</span>

            <ChevronSvg />
          </Button>
        </div>
      </ContentWrapper>
    </main>
  );
}

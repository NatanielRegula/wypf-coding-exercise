'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import ContentWrapper from '../../global_components/content_wrapper/ContentWrapper';

import styles from './page.module.css';

import AlbumCard from './components/albumCard/AlbumCard';
import { Album, AlbumsApiResponse } from '../api/albums/types';
import { User } from '../api/users/types';
import LoadingIndicator from '@/global_components/loadingIndicator/LoadingIndicator';
import { ButtonLink } from '@/global_components/button/Button';
import classNames from 'classnames';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ChevronSvg from '@/global_components/chevronSvg/ChevronSvg';
import SearchBar from '@/global_components/searchBar/SearchBar';
import SkeletonBars from '@/global_components/skeleton/Skeleton';
import { parseBoolean } from '@/utils/parseBoolean';

export default function Albums() {
  const isFirstRender = useRef(true);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pagesCount = searchParams.get('pagesCount') ?? '10';
  const hasNextPage = parseBoolean(searchParams.get('hasNextPage') ?? 'true');
  const hasPrevPage = parseBoolean(searchParams.get('hasPrevPage') ?? 'false');
  const itemsPerPage = searchParams.get('itemsPerPage') ?? '10';
  const currentPage = searchParams.get('page') ?? '1';
  const currentSearchQuery = searchParams.get('query') ?? '';

  const [searchBarValue, setSearchBarValue] = useState(
    decodeURI(currentSearchQuery)
  );

  const getUsers = async () => {
    const usersResponse = await fetch('/api/users');

    const usersResponseJson = await usersResponse.json();

    setUsers(usersResponseJson);
  };

  const getAlbums = async () => {
    setAlbums([]);

    const apiParams = new URLSearchParams([
      ['itemsPerPage', itemsPerPage],
      ['page', currentPage],
      ['query', currentSearchQuery],
    ]);

    const albumsResponse = await fetch(`/api/albums?${apiParams.toString()}`);

    const albumsResponseJson: AlbumsApiResponse = await albumsResponse.json();

    setAlbums(albumsResponseJson.data);

    const params = new URLSearchParams(searchParams.toString());

    params.set('page', albumsResponseJson.currentPage.toString());
    params.set('itemsPerPage', albumsResponseJson.itemsPerPage.toString());
    params.set('hasPrevPage', albumsResponseJson.hasPrevPage.toString());
    params.set('hasNextPage', albumsResponseJson.hasNextPage.toString());
    params.set('pagesCount', albumsResponseJson.pagesCount.toString());

    params.sort();

    router.push(pathname + '?' + params.toString(), { shallow: true });
  };

  useEffect(() => {
    Promise.all([getAlbums(), getUsers()]);
  }, [itemsPerPage, currentPage, currentSearchQuery]);

  const searchHandler = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('query', encodeURI(searchBarValue));

    router.push(pathname + '?' + params.toString(), { shallow: true });
  }, [searchBarValue]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchHandler();
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [searchBarValue]);

  return (
    <main className={styles.page}>
      <ContentWrapper className={styles.contentWrapper}>
        <LoadingIndicator loading={albums.length === 0 || users.length === 0} />

        <h1>Albums list</h1>
        <SearchBar
          className={styles.searchBar}
          value={searchBarValue}
          onChange={(e) => {
            setSearchBarValue(e.currentTarget.value);
          }}
        />

        <div className={styles.list}>
          {pagesCount === '0' && (
            <div>
              <span>No results for: {decodeURI(currentSearchQuery)}</span>
            </div>
          )}

          {pagesCount !== '0' && albums.length === 0 && (
            <SkeletonBars quantity={parseInt(itemsPerPage)} />
          )}

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
          <ButtonLink
            className={styles.btn}
            href={`?page=${(parseInt(currentPage) - 1).toString()}`}
            visuallyDisabled={!hasPrevPage}
            functionalityDisabled={!hasPrevPage}
          >
            <ChevronSvg />
            <span>Priv</span>
          </ButtonLink>

          <span>{`${currentPage} / ${pagesCount}`}</span>

          <ButtonLink
            className={classNames(styles.btn, styles.next)}
            href={`?page=${(parseInt(currentPage) + 1).toString()}`}
            visuallyDisabled={!hasNextPage}
            functionalityDisabled={!hasNextPage}
          >
            <span>Next</span>

            <ChevronSvg />
          </ButtonLink>
        </div>
      </ContentWrapper>
    </main>
  );
}

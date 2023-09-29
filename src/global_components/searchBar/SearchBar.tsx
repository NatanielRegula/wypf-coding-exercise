import { ButtonHTMLAttributes } from 'react';
import styles from './SearchBar.module.css';
import classNames from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLInputElement> {}

export default function SearchBar(props: Props) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="searchBarInput">
        Search
      </label>
      <input
        {...props}
        id="searchBarInput"
        className={classNames(styles.searchBar, props.className ?? '')}
        placeholder="Album name"
      />
    </div>
  );
}

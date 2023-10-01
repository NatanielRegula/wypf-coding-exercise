import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';
import { parseBoolean } from '@/utils/parseBoolean';

export default function ThemeToggle() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    setDarkTheme(
      parseBoolean(localStorage.getItem('colorThemeDark') ?? 'false')
    );
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.querySelector('body')!.classList.add('darkColorTheme');
      localStorage.setItem('colorThemeDark', true.toString());
    } else {
      document.querySelector('body')!.classList.remove('darkColorTheme');
      localStorage.setItem('colorThemeDark', false.toString());
    }
  }, [darkTheme]);

  return (
    <button
      className={styles.themeToggle}
      onClick={() => setDarkTheme((v) => !v)}
    >
      <span className="srOnly">Toggle dark theme</span>
    </button>
  );
}

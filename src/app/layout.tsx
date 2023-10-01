import Navbar from '@/global_components/navbar/Navbar';
import './style/globals.css';
import { Poppins } from 'next/font/google';
import classNames from 'classnames';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: 'WYPF Coding Exercise - Nataniel Regula',
  description: 'WYPF Coding Exercise - Nataniel Regula',
  other: {
    ///disabling Dark Reader extension (third party dark mode)
    'darkreader-lock': '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={classNames(poppins.variable, 'lightColorTheme')} lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}

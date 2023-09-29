import Navbar from '@/global_components/navbar/Navbar';
import './style/globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: 'WYPF Coding Exercise - Nataniel Regula',
  description: 'WYPF Coding Exercise - Nataniel Regula',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={poppins.variable} lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}

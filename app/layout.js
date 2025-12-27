import './globals.css';
import Header from './components/Header';
import AppWalletProvider from './providers/WalletProvider';

export const metadata = {
  title: 'Solbazar - Trade on Solana',
  description: 'The market place for buying and selling products using Solana',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Importing Google Fonts: Inter for reading, Press Start 2P for headers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppWalletProvider>
          <div className="layout-wrapper">
            <Header />
            {children}
          </div>
        </AppWalletProvider>
      </body>
    </html>
  );
}

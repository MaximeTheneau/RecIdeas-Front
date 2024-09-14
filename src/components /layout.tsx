import * as React from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="min-h-10">
        <Navbar />
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

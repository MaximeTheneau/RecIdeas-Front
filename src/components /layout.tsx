import * as React from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-auto shadow-md  ">
        <Navbar />
      </header>
      <main className="flex-grow p-4 pt-20 ">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

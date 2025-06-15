
import React from 'react';
import Header from './Header';
import { HeaderProvider } from '@/contexts/HeaderContext';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </HeaderProvider>
  );
};

export default Layout;

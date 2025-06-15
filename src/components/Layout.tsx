
import React from 'react';
import Header from './Header';
import { HeaderProvider } from '@/contexts/HeaderContext';
import Footer from './Footer';
import HelpGuide from './HelpGuide';
import { Github } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        
        <div className="fixed bottom-6 right-6 flex flex-col-reverse items-center gap-4 z-40">
          <HelpGuide />
          <a
            href="https://github.com/Gatogordo03"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 flex items-center justify-center bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
        </div>

        <Footer />
      </div>
    </HeaderProvider>
  );
};

export default Layout;


import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('common');

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-accent transition-colors">
            <BrainCircuit className="text-accent" />
            <span>{t('appName')}</span>
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;

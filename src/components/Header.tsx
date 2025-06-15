
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('common');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-accent transition-colors">
          <BrainCircuit className="text-accent" />
          <span>{t('appName')}</span>
        </Link>
        <LocaleSwitcher />
      </div>
    </header>
  );
};

export default Header;

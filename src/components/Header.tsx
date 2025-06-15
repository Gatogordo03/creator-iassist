
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useHeader } from '@/contexts/HeaderContext';

const Header = () => {
  const { t } = useTranslation('common');
  const { scrollY } = useScroll();
  const { isHeaderHidden, setIsHeaderHidden } = useHeader();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setIsHeaderHidden(true);
    } else if (latest < previous) {
      setIsHeaderHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={isHeaderHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-accent transition-colors">
          <BrainCircuit className="text-accent" />
          <span>{t('appName')}</span>
        </Link>
        <LocaleSwitcher />
      </div>
    </motion.header>
  );
};

export default Header;

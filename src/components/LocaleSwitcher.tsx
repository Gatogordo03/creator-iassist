
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language.split('-')[0].toUpperCase();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="w-[80px]"
      aria-label={`Change language to ${currentLang === 'ES' ? 'English' : 'Spanish'}`}
    >
      <Globe />
      <div className="relative overflow-hidden h-5 w-8 flex items-center justify-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={currentLang}
            initial={{ y: 10, opacity: 0, filter: 'blur(2px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -10, opacity: 0, filter: 'blur(2px)' }}
            transition={{ duration: 0.2, ease: 'circOut' }}
            className="absolute font-medium"
          >
            {currentLang}
          </motion.span>
        </AnimatePresence>
      </div>
    </Button>
  );
};

export default LocaleSwitcher;

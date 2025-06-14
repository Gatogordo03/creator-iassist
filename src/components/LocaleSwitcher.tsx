
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'en' | 'es') => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={i18n.language === 'es' ? 'default' : 'ghost'}
        size="sm"
        className={`rounded-full ${i18n.language === 'es' ? 'bg-accent text-white hover:bg-accent/90' : ''}`}
        onClick={() => changeLanguage('es')}
      >
        ES
      </Button>
      <Button
        variant={i18n.language === 'en' ? 'default' : 'ghost'}
        size="sm"
        className={`rounded-full ${i18n.language === 'en' ? 'bg-accent text-white hover:bg-accent/90' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
    </div>
  );
};

export default LocaleSwitcher;

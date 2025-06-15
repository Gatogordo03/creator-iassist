
import { useTranslation } from 'react-i18next';
import { User, Shield, Bell, Palette, Languages, Sparkles, History, ShieldCheck, HelpCircle, Info, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileSettingsPopover = () => {
  const { t } = useTranslation('common');

  const menuItems = [
    { icon: User, key: 'personal' },
    { icon: Shield, key: 'account' },
    { icon: Bell, key: 'notifications' },
    { icon: Palette, key: 'appearance' },
    { icon: Languages, key: 'language' },
  ];
  
  const secondaryMenuItems = [
    { icon: Sparkles, key: 'aiSettings' },
    { icon: History, key: 'activity' },
    { icon: ShieldCheck, key: 'privacy' },
  ];
  
  const helpItems = [
      { icon: HelpCircle, key: 'help' },
      { icon: Info, key: 'about' },
  ];

  return (
    <div className="flex flex-col">
        <div className="p-4 border-b">
            <div className="flex items-center gap-3">
                <div className="size-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="text-slate-500" />
                </div>
                <div>
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-sm text-slate-500">jane.doe@example.com</p>
                </div>
            </div>
        </div>

        <div className="p-2">
            {menuItems.map(({ icon: Icon, key }) => (
                <a href="#" key={key} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors text-sm w-full">
                    <Icon className="size-4 text-slate-500" />
                    <span>{t(`profile.${key}`)}</span>
                </a>
            ))}
        </div>

        <hr className="my-1" />

        <div className="p-2">
            {secondaryMenuItems.map(({ icon: Icon, key }) => (
                <a href="#" key={key} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors text-sm w-full">
                    <Icon className="size-4 text-slate-500" />
                    <span>{t(`profile.${key}`)}</span>
                </a>
            ))}
        </div>

        <hr className="my-1" />

        <div className="p-2">
            {helpItems.map(({ icon: Icon, key }) => (
                <a href="#" key={key} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors text-sm w-full">
                    <Icon className="size-4 text-slate-500" />
                    <span>{t(`profile.${key}`)}</span>
                </a>
            ))}
        </div>
        
        <hr className="my-1" />

        <div className="p-2">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-3 size-4" />
                <span>{t('profile.logout')}</span>
            </Button>
        </div>

    </div>
  );
};

export default ProfileSettingsPopover;


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Workspace } from '@/api/types';
import { ArrowRight, Youtube, Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const platformConfig: Record<Workspace['platform'], { icon: React.ElementType; style: string; textColor: string; }> = {
    youtube: {
        icon: Youtube,
        style: 'border-red-200 hover:border-red-400',
        textColor: 'text-red-500',
    },
    tiktok: {
        icon: Film, // Usando film como sustituto para TikTok
        style: 'border-purple-200 hover:border-purple-400',
        textColor: 'text-purple-500',
    },
    general: {
        icon: Film,
        style: 'border-slate-200 hover:border-accent',
        textColor: 'text-slate-500',
    }
};

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  const { t } = useTranslation('common');
  const config = platformConfig[workspace.platform] || platformConfig.general;
  const PlatformIcon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-full"
    >
      <Link to={`/workspace/${workspace.id}`} className="block h-full">
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.07)" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`bg-white p-6 rounded-lg border flex flex-col h-full transition-colors group ${config.style}`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 pr-2">{workspace.title}</h3>
            <PlatformIcon className={`h-6 w-6 shrink-0 ${config.textColor}`} />
          </div>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2 flex-grow">{workspace.description}</p>
          
          <div className="mt-4 flex justify-between items-end gap-2">
            {workspace.contentType && (
              <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full whitespace-nowrap">
                {t(`contentTypes.${workspace.contentType}`)}
              </span>
            )}
            <div className="flex items-center text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto shrink-0">
              {t('viewDetails')} <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default WorkspaceCard;

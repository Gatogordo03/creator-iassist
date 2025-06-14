
import { useQuery } from '@tanstack/react-query';
import { getWorkspaces } from '@/api/workspaces';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader } from 'lucide-react';
import WorkspaceCard from '@/components/WorkspaceCard';

const DashboardPage = () => {
  const { t } = useTranslation('common');
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspaces
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">{t('dashboardTitle')}</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-white">
          <Link to="/workspace/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('newWorkspace')}
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : workspaces && workspaces.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {workspaces.map(ws => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-600">{t('noWorkspaces')}</h2>
          <p className="text-slate-500 mt-2">{t('startCreating')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardPage;

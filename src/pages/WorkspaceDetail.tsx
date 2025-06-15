
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWorkspaceById, updateWorkspace, deleteWorkspace } from '@/api/workspaces';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader, Trash2, CheckCircle, Save } from 'lucide-react';
import { Workspace } from '@/api/types';

// Import new card components
import ContextCard from './workspace-detail/ContextCard';
import TitleCard from './workspace-detail/TitleCard';
import DescriptionCard from './workspace-detail/DescriptionCard';
import TagsCard from './workspace-detail/TagsCard';
import SeoCard from './workspace-detail/SeoCard';
import ThumbnailCard from './workspace-detail/ThumbnailCard';
import SettingsCard from './workspace-detail/SettingsCard';

const WorkspaceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<Partial<Workspace>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  const { data: workspace, isLoading, isError } = useQuery({
    queryKey: ['workspace', id],
    queryFn: () => getWorkspaceById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (workspace) {
      setFormState(workspace);
    }
  }, [workspace]);

  const updateMutation = useMutation({
    mutationFn: (updatedData: Partial<Workspace>) => updateWorkspace(id!, updatedData),
    onMutate: () => setIsSaving(true),
    onSuccess: (data) => {
      queryClient.setQueryData(['workspace', id], data);
      queryClient.invalidateQueries({ queryKey: ['workspaces']});
      setTimeout(() => setIsSaving(false), 1200);
    },
    onError: () => setIsSaving(false),
  });
  
  const deleteMutation = useMutation({
    mutationFn: () => deleteWorkspace(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces']});
      navigate('/');
    }
  });

  const handleUpdateField = (field: keyof Workspace, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    updateMutation.mutate(formState);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader className="h-12 w-12 animate-spin text-accent" /></div>;
  if (isError || !workspace) return <div className="text-center py-20">{t('workspaceNotFound')}</div>;

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-7xl mx-auto px-4 pb-12"
    >
      <header className="flex justify-between items-center py-4 mb-6 sticky top-16 bg-background/95 backdrop-blur-sm z-30 border-b -mx-4 px-4">
        <h1 className="text-2xl font-bold truncate pr-4" title={formState.title}>
          {formState.title || t('untitledWorkspace')}
        </h1>
        <div className="flex gap-2 shrink-0">
           <Button onClick={handleSave} disabled={isSaving || updateMutation.isPending} className="bg-accent hover:bg-accent/90 text-white min-w-[110px]">
            {isSaving ? <CheckCircle /> : <Save />}
            <span>{isSaving ? t('saved') : t('save')}</span>
          </Button>
          <Button variant="destructive" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>
            <Trash2 />
          </Button>
        </div>
      </header>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="lg:col-span-2 lg:row-span-2">
            <ContextCard 
                context={formState.context || ''}
                onUpdate={(value) => handleUpdateField('context', value)}
            />
        </div>

        <TitleCard
            title={formState.title || ''}
            context={formState.context || ''}
            platform={formState.platform || 'general'}
            onUpdate={(value) => handleUpdateField('title', value)}
        />

        <DescriptionCard
            description={formState.description || ''}
            context={formState.context || ''}
            platform={formState.platform || 'general'}
            onUpdate={(value) => handleUpdateField('description', value)}
        />
        
        <TagsCard 
            tags={formState.tags || []}
            context={formState.context || ''}
            platform={formState.platform || 'general'}
            onUpdate={(value) => handleUpdateField('tags', value)}
        />

        <SeoCard
            keywords={formState.seoKeywords || []}
            context={formState.context || ''}
            onUpdate={(value) => handleUpdateField('seoKeywords', value)}
        />
        
        <SettingsCard
            platform={formState.platform || 'general'}
            contentType={formState.contentType || 'otro'}
            targetAudience={formState.targetAudience || ''}
            onUpdate={handleUpdateField}
        />

        <div className="lg:col-span-3">
          <ThumbnailCard
              prompt={formState.thumbnailPrompt || ''}
              context={formState.context || ''}
              onUpdate={(value) => handleUpdateField('thumbnailPrompt', value)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkspaceDetailPage;

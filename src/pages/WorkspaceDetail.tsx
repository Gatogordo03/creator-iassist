
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWorkspaceById, updateWorkspace, deleteWorkspace } from '@/api/workspaces';
import * as iaApi from '@/api/ia';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/Spinner';
import { Loader, Sparkles, Trash2, CheckCircle } from 'lucide-react';
import { Workspace } from '@/api/types';

const WorkspaceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<Partial<Workspace>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);

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
      setTimeout(() => setIsSaving(false), 1000);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const handleSave = () => {
    updateMutation.mutate(formState);
  };
  
  const handleGenerate = async (field: 'title' | 'description' | 'tags' | 'thumbnailPrompt' | 'seoKeywords') => {
    setAiLoading(field);
    try {
      let result: any;
      const context = formState.context || '';
      const platform = formState.platform || 'general';

      switch (field) {
        case 'title':
          const titles = await iaApi.generateTitle(context, platform);
          result = titles[0] || ''; // Pick first
          break;
        case 'description':
          const descriptions = await iaApi.generateDescription(context, platform);
          result = descriptions[0] || ''; // Pick first
          break;
        case 'tags':
          result = await iaApi.generateTags(context, platform);
          break;
        case 'thumbnailPrompt':
            const prompts = await iaApi.generateThumbnailPrompt(context);
            result = prompts[0] || ''; // Pick first
            break;
        case 'seoKeywords':
            result = await iaApi.generateSeoKeywords(context);
            break;
        default:
          break;
      }
      
      setFormState(prev => ({ ...prev, [field]: result }));
    } finally {
      setAiLoading(null);
    }
  };


  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader className="h-8 w-8 animate-spin text-accent" /></div>;
  if (isError || !workspace) return <div className="text-center">Workspace not found.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <input
          name="title"
          value={formState.title || ''}
          onChange={handleInputChange}
          className="text-3xl font-bold bg-transparent outline-none w-full"
        />
        <div className="flex gap-2">
           <Button onClick={handleSave} disabled={isSaving} className="bg-accent hover:bg-accent/90 text-white min-w-[100px]">
            {isSaving ? <CheckCircle className="h-5 w-5" /> : t('save')}
          </Button>
          <Button variant="destructive" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-8 bg-white p-8 rounded-lg border">
        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center justify-between">
            <span>{t('workspaceDescription')}</span>
            <Button size="sm" variant="ghost" onClick={() => handleGenerate('description')} disabled={!!aiLoading}>
              {aiLoading === 'description' ? <Spinner size="sm" /> : <><Sparkles className="mr-2 h-4 w-4 text-accent"/> {t('generateWithAI')}</>}
            </Button>
          </Label>
          <Textarea id="description" name="description" value={formState.description || ''} onChange={handleInputChange} rows={4} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="context">{t('workspaceContext')}</Label>
          <Textarea id="context" name="context" value={formState.context || ''} onChange={handleInputChange} rows={12} className="font-mono text-sm" />
        </div>
      </div>
    </motion.div>
  );
};

export default WorkspaceDetailPage;

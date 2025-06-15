
// This is a placeholder for the wizard. A full implementation is complex.
// For now, it will be a simple form that creates a new workspace.
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { createWorkspace } from '@/api/workspaces';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/Spinner';

const NewWorkspacePage = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');

  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      navigate(`/workspace/${data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    mutation.mutate({
      title,
      description,
      context,
      tags: [],
      references: [],
      // Valores por defecto para la nueva estructura
      platform: 'general',
      contentType: 'otro',
      thumbnailPrompt: '',
      seoKeywords: [],
      targetAudience: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t('newWorkspace')}</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="title">{t('workspaceTitle')}</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Mi nueva novela de ciencia ficción" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t('workspaceDescription')}</Label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Una breve sinopsis de la idea..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="context">{t('workspaceContext')}</Label>
            <Textarea id="context" value={context} onChange={e => setContext(e.target.value)} rows={8} placeholder="Añade aquí todo el contexto, ideas, notas..." />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner size="sm" /> : t('createWorkspace')}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default NewWorkspacePage;

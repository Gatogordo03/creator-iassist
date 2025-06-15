
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import * as iaApi from '@/api/ia';
import { Workspace } from '@/api/types';
import { Sparkles, X, Plus } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

interface TagsCardProps {
  tags: string[];
  context: string;
  platform: Workspace['platform'];
  onUpdate: (tags: string[]) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const TagsCard = ({ tags, context, platform, onUpdate }: TagsCardProps) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    const results = await iaApi.generateTags(context, platform);
    const updatedTags = [...new Set([...tags, ...results])];
    onUpdate(updatedTags);
    setIsGenerating(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onUpdate([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    onUpdate(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className="hover:border-accent transition-colors duration-300 h-full">
        <CardHeader>
          <CardTitle>{t('workspaceTags')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[24px]">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="group text-sm">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </Badge>
            ))}
             {tags.length === 0 && <p className="text-sm text-muted-foreground">{t('noTagsYet')}</p>}
          </div>
          <div className="flex gap-2">
            <Input 
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('addTagPlaceholder')}
            />
            <Button size="icon" variant="outline" onClick={handleAddTag} aria-label={t('addTag')}>
                <Plus/>
            </Button>
          </div>
          <Button variant="ghost" onClick={handleGenerate} disabled={isGenerating || !context} className="w-full">
            {isGenerating ? <Spinner size="sm" /> : <Sparkles className="text-accent" />}
            <span>{t('generateWithAI')}</span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TagsCard;

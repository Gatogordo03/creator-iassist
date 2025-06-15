
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import * as iaApi from '@/api/ia';
import { Sparkles, X, Plus } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

interface SeoCardProps {
  keywords: string[];
  context: string;
  onUpdate: (keywords: string[]) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const SeoCard = ({ keywords, context, onUpdate }: SeoCardProps) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    const results = await iaApi.generateSeoKeywords(context);
    const updatedKeywords = [...new Set([...keywords, ...results])];
    onUpdate(updatedKeywords);
    setIsGenerating(false);
  };
  
  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      onUpdate([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };
  
  const handleRemoveKeyword = (keywordToRemove: string) => {
    onUpdate(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className="hover:border-accent transition-colors duration-300 h-full">
        <CardHeader>
          <CardTitle>{t('workspaceSeoKeywords')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[24px]">
            {keywords.map(keyword => (
              <Badge key={keyword} variant="outline" className="group text-sm">
                {keyword}
                <button onClick={() => handleRemoveKeyword(keyword)} className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </Badge>
            ))}
             {keywords.length === 0 && <p className="text-sm text-muted-foreground">{t('noSeoKeywordsYet')}</p>}
          </div>
           <div className="flex gap-2">
            <Input
              value={newKeyword}
              onChange={e => setNewKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('addKeywordPlaceholder')}
            />
             <Button size="icon" variant="outline" onClick={handleAddKeyword} aria-label={t('addKeyword')}>
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

export default SeoCard;


import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import * as iaApi from '@/api/ia';
import { Sparkles } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

interface ThumbnailCardProps {
  prompt: string;
  context: string;
  onUpdate: (value: string) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const ThumbnailCard = ({ prompt, context, onUpdate }: ThumbnailCardProps) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const results = await iaApi.generateThumbnailPrompt(context);
    setVariants(results);
    setIsGenerating(false);
  };
  
  const handleSelectVariant = (variant: string) => {
    onUpdate(variant);
    setVariants([]);
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className="hover:border-accent transition-colors duration-300">
        <CardHeader>
          <CardTitle>{t('workspaceThumbnail')}</CardTitle>
          <CardDescription>{t('workspaceThumbnailDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center border">
              <img src="/placeholder.svg" alt="Thumbnail placeholder" className="h-24 w-24 opacity-20" />
           </div>
          <Textarea
            value={prompt}
            onChange={(e) => onUpdate(e.target.value)}
            rows={4}
            className="font-mono text-sm resize-none"
            placeholder={t('workspaceThumbnailPlaceholder')}
          />
          <Button variant="ghost" onClick={handleGenerate} disabled={isGenerating || !context} className="w-full">
            {isGenerating ? <Spinner size="sm" /> : <Sparkles className="text-accent" />}
            <span>{t('generatePromptWithAI')}</span>
          </Button>
           {variants.length > 0 && (
            <div className="flex flex-col space-y-2 pt-2 animate-fade-in">
              <p className="text-sm font-medium text-muted-foreground">{t('iaSuggestions')}</p>
              {variants.map((v, i) => (
                <Button key={i} variant="outline" size="sm" onClick={() => handleSelectVariant(v)} className="text-left justify-start h-auto whitespace-normal">
                  {v}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThumbnailCard;

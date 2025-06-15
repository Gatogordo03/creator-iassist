
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import * as iaApi from '@/api/ia';
import { Workspace } from '@/api/types';
import { Sparkles, Copy, Check, X } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { useToast } from '@/hooks/use-toast';

interface DescriptionCardProps {
  description: string;
  context: string;
  platform: Workspace['platform'];
  onUpdate: (value: string) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const DescriptionCard = ({ description, context, platform, onUpdate }: DescriptionCardProps) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    const results = await iaApi.generateDescription(context, platform);
    setVariants(results);
    setIsGenerating(false);
  };

  const handleSelectVariant = (variant: string) => {
    onUpdate(variant);
    setVariants([]);
  };

  const handleCopy = async () => {
    if (!description) return;
    try {
      await navigator.clipboard.writeText(description);
      setIsCopied(true);
      toast({ title: t('copiedToClipboard') });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({ variant: 'destructive', title: t('copyFailed') });
    }
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className="hover:border-accent transition-colors duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('workspaceDescription')}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCopy} aria-label={t('copy')}>
              {isCopied ? <Check className="text-green-500" /> : <Copy />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => onUpdate(e.target.value)}
            rows={6}
            placeholder={t('workspaceDescriptionPlaceholder')}
            className="resize-none"
          />
          <Button variant="ghost" onClick={handleGenerate} disabled={isGenerating || !context} className="w-full">
            {isGenerating ? <Spinner size="sm" /> : <Sparkles className="text-accent" />}
            <span>{t('generateWithAI')}</span>
          </Button>
           {variants.length > 0 && (
            <div className="flex flex-col space-y-2 pt-2 animate-fade-in">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">{t('iaSuggestions')}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setVariants([])} aria-label={t('discardSuggestions')}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
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

export default DescriptionCard;

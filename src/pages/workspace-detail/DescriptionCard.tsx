
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import * as iaApi from '@/api/ia';
import { Workspace } from '@/api/types';
import { Sparkles } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface DescriptionCardProps {
  description: string;
  context: string;
  platform: Workspace['platform'];
  onUpdate: (value: string) => void;
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const DescriptionCard = ({ description, context, platform, onUpdate }: DescriptionCardProps) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);

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

  return (
    <motion.div variants={cardVariants}>
      <Card className="hover:border-accent transition-colors duration-300">
        <CardHeader>
          <CardTitle>{t('workspaceDescription')}</CardTitle>
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

export default DescriptionCard;

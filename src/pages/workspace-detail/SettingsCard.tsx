
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Workspace } from '@/api/types';
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

interface SettingsCardProps {
  platform: Workspace['platform'];
  contentType: Workspace['contentType'];
  targetAudience: string;
  onUpdate: (field: keyof Pick<Workspace, 'platform' | 'contentType' | 'targetAudience'>, value: any) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const SettingsCard = ({ platform, contentType, targetAudience, onUpdate }: SettingsCardProps) => {
  const { t } = useTranslation();
  
  const platformOptions: Workspace['platform'][] = ['youtube', 'tiktok', 'general'];
  const contentTypeOptions: Workspace['contentType'][] = ['review', 'tutorial', 'gaming', 'vlog', 'unboxing', 'otro'];

  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full hover:border-accent transition-colors duration-300">
        <CardHeader>
          <CardTitle>{t('workspaceSettings')}</CardTitle>
          <CardDescription>{t('workspaceSettingsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform">{t('platform')}</Label>
            <Select value={platform} onValueChange={(value: Workspace['platform']) => onUpdate('platform', value)}>
              <SelectTrigger id="platform">
                <SelectValue placeholder={t('selectPlatform')} />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map(opt => (
                  <SelectItem key={opt} value={opt}>{t(`platforms.${opt}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contentType">{t('contentType')}</Label>
            <Select value={contentType} onValueChange={(value: Workspace['contentType']) => onUpdate('contentType', value)}>
              <SelectTrigger id="contentType">
                <SelectValue placeholder={t('selectContentType')} />
              </SelectTrigger>
              <SelectContent>
                {contentTypeOptions.map(opt => (
                  <SelectItem key={opt} value={opt}>{t(`contentTypes.${opt}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAudience">{t('targetAudience')}</Label>
            <Textarea 
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => onUpdate('targetAudience', e.target.value)}
              rows={4}
              placeholder={t('targetAudiencePlaceholder')}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsCard;

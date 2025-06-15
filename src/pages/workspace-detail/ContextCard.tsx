
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";

interface ContextCardProps {
  context: string;
  onUpdate: (value: string) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const ContextCard = ({ context, onUpdate }: ContextCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full hover:border-accent transition-colors duration-300">
        <CardHeader>
          <CardTitle>{t('workspaceContext')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={context}
            onChange={(e) => onUpdate(e.target.value)}
            rows={18}
            className="font-mono text-sm resize-none"
            placeholder={t('workspaceContextPlaceholder')}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContextCard;

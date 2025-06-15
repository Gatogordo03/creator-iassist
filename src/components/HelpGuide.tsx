
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles, PencilRuler, Save } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const HelpGuide = () => {
  const { t } = useTranslation("common")

  const guideSteps = [
    {
      icon: <PencilRuler className="h-8 w-8 text-accent" />,
      title: t("helpGuide.step1.title"),
      description: t("helpGuide.step1.description"),
    },
    {
      icon: <Sparkles className="h-8 w-8 text-accent" />,
      title: t("helpGuide.step2.title"),
      description: t("helpGuide.step2.description"),
    },
    {
      icon: <Save className="h-8 w-8 text-accent" />,
      title: t("helpGuide.step3.title"),
      description: t("helpGuide.step3.description"),
    },
  ]

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-white animate-fade-in"
              aria-label={t("helpGuide.triggerTooltip")}
            >
              <HelpCircle className="h-7 w-7" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t("helpGuide.triggerTooltip")}</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">{t("helpGuide.title")}</DialogTitle>
          <DialogDescription className="text-center px-4">
            {t("helpGuide.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-8">
          {guideSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="flex-shrink-0 mt-1">{step.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HelpGuide

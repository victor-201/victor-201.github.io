import { BlurIn } from "../reveal-animations";
import { useLocale } from "@/locales/use-locale";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { config } from "@/lib/app-config";

const AboutSection = () => {
  const { t } = useLocale();

  return (
    <SectionWrapper id="about" className="min-h-screen scroll-mt-[80px]">
      <SectionHeader id='about' title={t("about", "title")} desc={t("about", "desc")} />
      <div className="grid md:grid-cols-2 gap-12 px-4 sm:px-8 mt-24 items-center">
        <div className="col-span-1 max-w-xl text-center md:text-left md:ml-12 lg:ml-20 flex flex-col justify-center items-center md:items-start">
          <BlurIn delay={0.4} duration={0.8}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800 dark:text-zinc-200">
              {t("about", "name")}
            </h3>
          </BlurIn>

          <BlurIn delay={0.6} duration={0.8}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              {t("about", "bio1")}
            </p>
          </BlurIn>

          <BlurIn delay={0.8} duration={0.8}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              {t("about", "bio2")}
            </p>
          </BlurIn>

          <BlurIn delay={1.0} duration={0.8}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("about", "bio3")}
            </p>
          </BlurIn>

          <BlurIn delay={1.2} duration={0.8}>
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block size-2 rounded-full bg-green-500" />
                {t("about", "available")}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block size-2 rounded-full bg-blue-500" />
                {config.email}
              </div>
            </div>
          </BlurIn>
        </div>
        <div className="col-span-1 hidden md:block" />
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;

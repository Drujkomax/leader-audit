import { motion } from "framer-motion";

import evosLogo from "@/assets/clients/evos.png";
import itecaLogo from "@/assets/clients/iteca.png";
import rozmetovLogo from "@/assets/clients/rozmetov.png";
import onaLogo from "@/assets/clients/ona.png";
import sherinLogo from "@/assets/clients/sherin.png";
import jizzaxLogo from "@/assets/clients/jizzax-organic.png";
import nokiaLogo from "@/assets/clients/nokia.png";
import dvePalochkiLogo from "@/assets/clients/dve-palochki.png";
import alkimLogo from "@/assets/clients/alkim-tekstil.png";
import eurasiaLogo from "@/assets/clients/eurasia-alliance-tex.png";
import pharmaLogo from "@/assets/clients/pharma-choice.png";
import segTascoLogo from "@/assets/clients/seg-tasco.png";
import nvbsLogo from "@/assets/clients/nvbs-tech.png";
import quantoLogo from "@/assets/clients/quanto-servicing.png";
import { useLanguage } from "@/contexts/language-context";

const TrustBar = () => {
  const { t } = useLanguage();

  const topRowLogos = [
    { name: "EVOS", src: evosLogo },
    { name: "Iteca Exhibitions", src: itecaLogo },
    { name: "Rozmetov", src: rozmetovLogo },
    { name: "Ona Foundation", src: onaLogo },
    { name: "Sherin", src: sherinLogo },
    { name: "Pharma Choice", src: pharmaLogo },
    { name: "SEG Tasco", src: segTascoLogo },
  ];

  const bottomRowLogos = [
    { name: "Jizzax Organic", src: jizzaxLogo },
    { name: "Nokia", src: nokiaLogo },
    { name: t.trustBar.twoSticksName, src: dvePalochkiLogo },
    { name: "Alkim Tekstil", src: alkimLogo },
    { name: "Eurasia Alliance Tex", src: eurasiaLogo },
    { name: "NVBS Tech", src: nvbsLogo },
    { name: "Quanto Servicing", src: quantoLogo },
  ];

  const topRowDuplicated = [...topRowLogos, ...topRowLogos, ...topRowLogos];
  const bottomRowDuplicated = [...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos];

  return (
    <section className="bg-card py-8 sm:py-10 md:py-12 border-y border-border overflow-hidden">
      <div className="container-wide mb-6 sm:mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs sm:text-sm font-medium uppercase tracking-wider"
        >
          {t.trustBar.title}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-4 sm:space-y-6"
      >
        {/* Top Row - Moves Left */}
        <div className="relative">
          <div className="flex animate-scroll-left">
            {topRowDuplicated.map((logo, index) => (
              <div
                key={`top-${logo.name}-${index}`}
                className="trust-logo flex-shrink-0 flex items-center justify-center h-16 sm:h-20 md:h-24 w-36 sm:w-44 md:w-52 mx-2 sm:mx-3 md:mx-4 bg-muted rounded-lg px-4"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width="160"
                  height="56"
                  loading="lazy"
                  decoding="async"
                  className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="relative">
          <div className="flex animate-scroll-right">
            {bottomRowDuplicated.map((logo, index) => (
              <div
                key={`bottom-${logo.name}-${index}`}
                className="trust-logo flex-shrink-0 flex items-center justify-center h-16 sm:h-20 md:h-24 w-36 sm:w-44 md:w-52 mx-2 sm:mx-3 md:mx-4 bg-muted rounded-lg px-4"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width="160"
                  height="56"
                  loading="lazy"
                  decoding="async"
                  className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustBar;

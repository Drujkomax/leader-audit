import { motion } from "framer-motion";

const TrustBar = () => {
  // Company logos for the carousel
  const topRowLogos = [
    { name: "1fit", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Buka", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
    { name: "BlackRock", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" },
    { name: "Seven", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
    { name: "Saber", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png" },
    { name: "TechCorp", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
  ];

  const bottomRowLogos = [
    { name: "FinGroup", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png" },
    { name: "MedPharma", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/2560px-Meta-Logo.png" },
    { name: "BuildCo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png" },
    { name: "InnoTech", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png" },
    { name: "GlobalNet", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" },
    { name: "SmartSys", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" },
  ];

  // Double the logos for seamless infinite scroll
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
          Нам доверяют лидеры рынка
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
                className="trust-logo flex-shrink-0 flex items-center justify-center h-12 sm:h-14 md:h-16 lg:h-20 w-32 sm:w-40 md:w-48 lg:w-56 mx-2 sm:mx-3 md:mx-4 bg-muted rounded-lg px-4"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
                className="trust-logo flex-shrink-0 flex items-center justify-center h-12 sm:h-14 md:h-16 lg:h-20 w-32 sm:w-40 md:w-48 lg:w-56 mx-2 sm:mx-3 md:mx-4 bg-muted rounded-lg px-4"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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

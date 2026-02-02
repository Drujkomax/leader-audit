import { motion } from "framer-motion";

const TrustBar = () => {
  // Placeholder logos - in production these would be real client logos
  const clients = [
    { name: "Artel", initials: "AR" },
    { name: "Redmi", initials: "RM" },
    { name: "TechCorp", initials: "TC" },
    { name: "FinGroup", initials: "FG" },
    { name: "MedPharma", initials: "MP" },
    { name: "BuildCo", initials: "BC" },
  ];

  return (
    <section className="bg-card py-8 sm:py-10 md:py-12 border-y border-border">
      <div className="container-wide">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs sm:text-sm font-medium uppercase tracking-wider mb-6 sm:mb-8"
        >
          Нам доверяют лидеры рынка
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 md:gap-8 lg:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="trust-logo flex items-center justify-center h-12 sm:h-14 md:h-16 lg:h-20 bg-muted rounded-lg"
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground">
                {client.initials}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;

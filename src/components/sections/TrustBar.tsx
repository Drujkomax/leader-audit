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
    <section className="bg-card py-12 border-y border-border">
      <div className="container-wide">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm font-medium uppercase tracking-wider mb-8"
        >
          Нам доверяют лидеры рынка
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="trust-logo flex items-center justify-center w-24 h-16 md:w-32 md:h-20 bg-muted rounded-lg"
            >
              <span className="text-2xl md:text-3xl font-bold text-muted-foreground">
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

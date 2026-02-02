import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Instagram } from "lucide-react";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "Telegram",
      icon: Send,
      href: "https://t.me/leaderaudit",
      color: "bg-[#0088cc] hover:bg-[#0077b5]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/leaderaudit",
      color: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90",
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 sm:bottom-16 left-0 flex flex-col gap-2 sm:gap-3"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-2 sm:gap-3 ${contact.color} text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg transition-all hover:scale-105`}
              >
                <contact.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{contact.name}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="relative group"
        aria-label={isOpen ? "Закрыть" : "Связаться с нами"}
      >
        {/* Glow effect */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-cta/40 animate-ping-slow" />
            <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-cta via-destructive to-cta opacity-50 blur-md animate-glow" />
          </>
        )}
        
        <span className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? "bg-muted-foreground text-white" 
            : "bg-cta hover:bg-cta-hover text-cta-foreground"
        }`}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingContact;

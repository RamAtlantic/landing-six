import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GiPartyPopper, GiPokerHand } from 'react-icons/gi';
import { FaCoins, FaGift } from 'react-icons/fa';
import LoadingButton from './LoadingButton'; // Assuming LoadingButton is in the same folder or adjust path

const REGISTER_URL = "https://sportsbet.bet.ar/registrarse?utm_source=publi1lauguty&utm_brandaffiliate=publi1lauguty"; // Or link to actual game area

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

interface CongratulationsBonusProps {
  onAcknowledge: () => void; // Function to close this view
  name?: string; // Optional name for personalization
  bonusAmount: number; // Make bonus amount a prop
  message?: string; // Optional custom message
  ctaText?: string;
  ctaHref?: string;
}

const CongratulationsBonus: React.FC<CongratulationsBonusProps> = ({
  onAcknowledge,
  name,
  bonusAmount,
  message = "¡Todo listo para empezar a jugar y ganar!", // Default message
  ctaText = "Jugar Ahora",
  ctaHref = REGISTER_URL,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formattedAmount = bonusAmount.toLocaleString('es-AR'); // Format number

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden py-16 px-4 font-special-gothic"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-green/30"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              scale: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              scale: [0, 1.5, 0], // Pop effect
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 1 + Math.random() * 1.5,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 3,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            {i % 2 === 0 ? <FaGift size={40 + Math.random()*40} /> : <FaCoins size={30 + Math.random()*30} />}
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeInUp} // Animate the card itself
        className="relative z-10 max-w-lg w-full bg-gradient-to-br from-[#2c2c2c] to-[#242424] rounded-2xl shadow-2xl p-8 md:p-12 text-center border-2 border-brand-green/50"
      >
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        >
          <GiPartyPopper className="text-7xl md:text-8xl text-brand-green mx-auto mb-6" />
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          className="text-2xl md:text-4xl lg:text-2xl font-black text-brand-green mb-4 uppercase tracking-wider"
        >
          ¡FELICITACIONES{name ? `, ${name}`: ''}!
        </motion.h1>
        
        <motion.h2 
          variants={fadeInUp}
          className="text-xl md:text-2xl font-semibold text-white mb-4"
        >
          HAS OBTENIDO TU BONO DE
        </motion.h2>
        
        <motion.div 
          variants={fadeInUp}
          className="text-4xl md:text-4xl font-extrabold text-white bg-brand-green/10 py-3 px-6 rounded-lg inline-block mb-8 shadow-inner"
        >
          ${formattedAmount}
        </motion.div>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg text-white/80 mb-10"
        >
          {message}
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <LoadingButton
            href={ctaHref} 
            variant="primary"
            className="w-full md:w-auto"
            // onClick={onAcknowledge} // Use onClick only if it's not a link
          >
            <GiPokerHand className="text-2xl" /> {ctaText}
          </LoadingButton>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default CongratulationsBonus; 
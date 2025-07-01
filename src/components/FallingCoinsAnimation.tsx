import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';

const NUM_COINS = 20; // Aumentado el número de fichas

const FallingCoinsAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(NUM_COINS)].map((_, i) => {
        // Configuración más variada para cada ficha
        const duration = 4 + Math.random() * 6; // Duración entre 4 y 10 segundos
        const delay = Math.random() * 8; // Retraso inicial hasta 8 segundos
        const initialX = `${Math.random() * 100}%`; // Posición horizontal aleatoria
        const rotation = Math.random() * 360; // Rotación inicial aleatoria
        const size = 1.5 + Math.random() * 2; // Tamaño entre 1.5rem y 3.5rem
        const swayAmount = 50 + Math.random() * 100; // Cantidad de balanceo

        return (
          <motion.div
            key={i}
            className="absolute text-amber-500"
            style={{
              top: '-10%',
              left: initialX,
              fontSize: `${size}rem`,
              filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))',
            }}
            initial={{ 
              rotate: rotation, 
              y: 0, 
              opacity: 0,
              x: 0 
            }}
            animate={{
              y: '110vh',
              opacity: [0, 0.8, 0.8, 0],
              rotate: rotation + (Math.random() > 0.5 ? 720 : -720),
              x: [
                0,
                swayAmount,
                -swayAmount,
                swayAmount,
                -swayAmount,
                0
              ],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatDelay: 2,
              ease: [0.4, 0, 0.2, 1],
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: duration * 1.1,
                repeat: Infinity,
                repeatDelay: 2,
                delay
              },
              x: {
                duration: duration * 1.2,
                repeat: Infinity,
                repeatDelay: 2,
                delay,
                ease: "easeInOut"
              }
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <FaCoins className="text-amber-500/90" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FallingCoinsAnimation; 
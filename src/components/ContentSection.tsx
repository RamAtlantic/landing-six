"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUserTracking } from "../contexts/TrackingContext"
import { sendMetaEvent } from "../services/metaEventService"
import { FaUserPlus } from "react-icons/fa"

export function ContentSectionUpdated() {
  const [isLoading, setIsLoading] = useState(false)
  const { sendTrackingData } = useUserTracking()
  const [isRuletaVideoVisible, setIsRuletaVideoVisible] = useState(false)

  const handleRegistration = async () => {
    setIsLoading(true)
    try {
      const tempEmail = `user_${Date.now()}@example.com`
      const success = await sendMetaEvent(tempEmail, "10")
      if (success) {
        console.log("Evento de registro enviado exitosamente a Meta")
      } else {
        console.warn("No se pudo enviar el evento a Meta")
      }
      try {
        await sendTrackingData()
        console.log("Datos de tracking enviados exitosamente")
      } catch (error) {
        console.warn("Error enviando datos de tracking:", error)
      }
      const registerUrl = import.meta.env.VITE_REGISTER_URL
      if (registerUrl) {
        window.location.href = registerUrl
      }
    } catch (error) {
      console.error("Error en el proceso de registro:", error)
      const registerUrl = import.meta.env.VITE_REGISTER_URL
      if (registerUrl) {
        window.location.href = registerUrl
      }
    }
  }

  const handleButtonClick = async (buttonId: string) => {
    setIsLoading(true)
    try {
      await handleRegistration()
    } finally {
      setIsLoading(false)
    }
  }

  const handleRuletaMouseEnter = () => {
    setIsRuletaVideoVisible(true)
    setTimeout(() => {
      setIsRuletaVideoVisible(false)
    }, 5000)
  }

  const CircularLoader = () => (
    <div className="loader-circle border-t-4 border-b-4 border-yellow-400 rounded-full w-8 h-8 animate-spin"></div>
  )

  return (
    <div className="bg-black h-[40vh] flex items-start justify-center mt-10 sm:mt-40 md:mb-20 sm:mb-20">
      <section className="container mx-auto px-3 lg:px-0 py-2">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          {/* Cards Section */}
          <div className="flex flex-col md:w-2/5 space-y-8">
            {/* Enhanced Create User Card with Crystal Glass Effect - Desktop */}
            <motion.div
              className="flex bg-black rounded-lg p-2 md:p-8 border border-gray-700 items-center justify-center flex-col relative overflow-hidden cursor-pointer group hover:border-yellow-500 hover:shadow-lg transition-all duration-500 ease-in-out pulse hidden md:flex"
              onClick={handleRegistration}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <FaUserPlus className="text-2xl md:text-3xl mb-2 md:mb-4 text-yellow-400" />

              {/* Animated Tech Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="tech-grid"></div>
                <div className="tech-lines"></div>
              </div>

              {/* Crystal Glass Reflection Effect */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/20 via-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              {/* Content */}
              <div className="relative z-10">
                {isLoading ? (
                  <CircularLoader />
                ) : (
                  <motion.h3
                    className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent title-chango mb-2 md:mb-3 lg:mb-4 text-center group-hover:text-black"
                    whileHover={{
                      textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    CREA TU USUARIO
                  </motion.h3>
                )}
                {!isLoading && (
                  <motion.p
                    className="text-lg md:text-xl lg:text-2xl text-white leading-tight text-center group-hover:text-black transition-colors text-base md:text-lg lg:text-xl duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    Y RECIBÍ RECOMPENSAS DE DEPÓSITO DE HASTA{" "}
                  
                  </motion.p>
                  
                )}
              </div>

              {/* Floating Particles Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Enhanced Mobile Button */}
            <motion.div
              className="md:hidden relative overflow-visible"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Custom Shadow Elements */}
              <div className="absolute inset-0 transform -translate-y-10 -translate-x-5 w-[100vw]"> {/* Ajusta translate-y */}
                {/* Main green shadow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-400/20 rounded-full blur-lg"></div> {/* Ajusta blur */}
                {/* Secondary yellow shadow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-400/15 rounded-full blur-md transform"></div> {/* Ajusta translate-y */}
                {/* Soft white glow */}
                <div className="absolute inset-0 bg-white/8 rounded-full blur-lg transform scale-105"></div> {/* Ajusta scale */}
              </div>

              {/* Hover Shadow Enhancement */}
              <motion.div
                className="absolute inset-0 transform translate-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-green-400/30 rounded-full blur-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-yellow-400/25 rounded-full blur-xl transform translate-y-1"></div>
              </motion.div>

              <motion.button
                className="relative w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-black font-bold py-2 px-8 rounded-full overflow-hidden group active:scale-95 transition-all duration-200 min-h-[120px] flex flex-col items-center justify-center transform hover:translate-y-[-2px]"
                onClick={handleRegistration}
                disabled={isLoading}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>

                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  {isLoading ? (
                    <CircularLoader />
                  ) : (
                    <div className="flex items-center justify-center">
                      <motion.span
                        className="text-xl font-bold title-chango text-center leading-tight"
                        animate={
                          !isLoading
                            ? {
                                textShadow: [
                                  "0 0 0px rgba(0,0,0,0.5)",
                                  "0 0 10px rgba(0,0,0,0.8)",
                                  "0 0 0px rgba(0,0,0,0.5)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        CREAR USUARIO
                      </motion.span>
                      <FaUserPlus className="text-2xl ml-1 text-black" />
                      
                    </div>
                  )}
                </div>

                {/* Inner Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </motion.button>

              {/* Mobile Description */}
              {!isLoading && (
                  <div>
                <motion.div
                  className="mt-4 text-center px-2 mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-white leading-tight mb-4">
                    Y RECIBÍ RECOMPENSAS DE DEPÓSITO DE HASTA{" "}
                   
                  </p>
                  <span className="font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent title-chango text-base text-[25px]">
                      $100.000 ARS
                    </span>
                </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <motion.p className="text-lg md:text-xl lg:text-4xl text-white text-center mt-4">
          plataforma directa, <span className="font-bold">sin intermediarios</span>
        </motion.p>
      </section>

      <style>{`
        .tech-grid {
          background-image: 
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: moveGrid 20s linear infinite;
        }

        .tech-lines {
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(34, 197, 94, 0.1) 50%,
            transparent 70%
          );
          animation: moveDiagonal 15s linear infinite;
        }

        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes moveDiagonal {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }

        .group:hover .tech-grid {
          animation-duration: 10s;
        }

        .group:hover .tech-lines {
          animation-duration: 8s;
        }

        .loader-circle {
          border-top-color: transparent;
        }

        @keyframes pulse {
          
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        /* Mobile touch improvements */
        @media (max-width: 768px) {
          button {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  )
}

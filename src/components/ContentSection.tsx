"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUserTracking } from "../contexts/TrackingContext"
import { sendMetaEvent } from "../services/metaEventService"
import { Loader } from "./Loader"
import { CasinoHoverVideo } from "./casinoHoverVideo"
import { RuletaHoverVideo } from "./ruleta-hover-video"
import { FaGift, FaUserPlus } from "react-icons/fa"

export function ContentSectionUpdated() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const { sendTrackingData } = useUserTracking()
  const [isRuletaVideoVisible, setIsRuletaVideoVisible] = useState(false)

  const handleRegistration = async () => {
    setLoadingStates((prevStates) => ({ ...prevStates, button1: true }))

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
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, button1: false }))
    }
  }

  const handleButtonClick = async (buttonId: string) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [buttonId]: true }))
    try {
      await handleRegistration()
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [buttonId]: false }))
    }
  }

  const handleRuletaMouseEnter = () => {
    setIsRuletaVideoVisible(true)
    setTimeout(() => {
      setIsRuletaVideoVisible(false)
    }, 5000)
  }

  return (
    <div className="bg-black h-[40vh] flex items-start justify-center mt-20 sm:mt-40">
      <section className="container mx-auto px-3 lg:px-0 py-2">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
         

          {/* Cards Section */}
          <div className="flex flex-col md:w-2/5 space-y-8">
            {/* Enhanced Create User Card with Crystal Glass Effect */}
            <motion.div
              className="flex bg-black rounded-lg p-2 md:p-8 border border-gray-700 items-center justify-center flex-col relative overflow-hidden cursor-pointer group hover:border-yellow-500 hover:shadow-lg transition-all duration-500 ease-in-out"
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
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/20 via-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              {/* Content */}
              <div className="relative z-10">
                {loadingStates["button1"] ? (
                  <Loader />
                ) : (
                  <motion.h3
                    className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent title-chango mb-2 md:mb-3 lg:mb-4 text-center group-hover:text-black"
                    whileHover={{
                      textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    CREA TU USUARIO
                  </motion.h3>
                )}

                <motion.p
                  className="text-lg md:text-xl m lg:text-2xl text-white leading-tight text-center group-hover:text-black transition-colors text-base md:text-lg lg:text-xl duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  Y RECIBÍ RECOMPENSAS DE DEPÓSITO DE HASTA{" "}{" "}
                  <motion.span
                    className="font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent group-hover:text-black title-chango"
                    whileHover={{
                      textShadow: "0 0 15px rgba(250, 204, 21, 0.5)",
                    }}
                  >
                   $100.000 ARS
                  </motion.span>
                </motion.p>

              
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

           
          </div>
        </div>
        <motion.p
                  className="text-lg md:text-xl lg:text-4xl text-white text-center mt-4"
                >
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
      `}</style>
    </div>
  )
}

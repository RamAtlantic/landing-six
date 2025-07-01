"use client"

import React, { useState, createContext, useContext, type ReactNode, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GiLaurels } from "react-icons/gi"
import { FaGift, FaRegIdCard } from "react-icons/fa"
import { TermsAndConditions } from "./components/TermsAndConditions"
import MockBonusPage from "./pages/MockBonusPage"
import { LuCircleDashed } from "react-icons/lu"
import { sendMetaEvent } from "./services/metaEventService"
import { TrackingProvider, useUserTracking } from "./contexts/TrackingContext"

const REGISTER_URL = import.meta.env.VITE_REGISTER_URL

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}


interface PopUpContextType {
  isOpen: boolean
  popUpContent: ReactNode | null
  openPopUp: (content: ReactNode) => void
  closePopUp: () => void
}

const PopUpContext = createContext<PopUpContextType | undefined>(undefined)

export const PopUpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [popUpContent, setPopUpContent] = useState<ReactNode | null>(null)

  const openPopUp = (content: ReactNode) => {
    setPopUpContent(content)
    setIsOpen(true)
  }

  const closePopUp = () => {
    setIsOpen(false)
    setPopUpContent(null)
  }

  return (
    <PopUpContext.Provider value={{ isOpen, popUpContent, openPopUp, closePopUp }}>{children}</PopUpContext.Provider>
  )
}

export const usePopUp = () => {
  const context = useContext(PopUpContext)
  if (context === undefined) {
    throw new Error("usePopUp must be used within a PopUpProvider")
  }
  return context
}

// Hook para detectar si es mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

// Componente interno que usa el tracking
const AppContent = () => {
  const [showTerms, setShowTerms] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const isMobile = useIsMobile()
  
  // Usar el tracking desde el context
  const { sendTrackingData, getVisitUid } = useUserTracking()

  useEffect(() => {
    const timer = setTimeout(() => setShowHeader(true), 5000)
    const handleScroll = () => {
      setShowHeader(true)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Función para manejar el registro y enviar evento a Meta
  const handleRegistration = async () => {
    try {
      // Generar un email temporal para el evento (en producción esto vendría del formulario de registro)
      const tempEmail = `user_${Date.now()}@example.com`;
      
      // Obtener el UID de la visita
      const visitUid = getVisitUid();
      
      // Enviar evento a Meta con el UID de la visita
      const success = await sendMetaEvent(tempEmail, import.meta.env.VITE_VALUE_PURCHASE || "132.52", visitUid);
      
      if (success) {
        console.log('Evento de registro enviado exitosamente a Meta con UID:', visitUid);
      } else {
        console.warn('No se pudo enviar el evento a Meta');
      }
      
      // Enviar datos de tracking antes de redirigir
      try {
        await sendTrackingData();
        console.log('Datos de tracking enviados exitosamente');
      } catch (error) {
        console.warn('Error enviando datos de tracking:', error);
      }
      
      // Redirigir al usuario a la URL de registro
      window.location.href = REGISTER_URL;
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      // Aún redirigir al usuario aunque falle el evento
      window.location.href = REGISTER_URL;
    }
  }

  // Simple routing based on pathname
  const pathname = window.location.pathname

  if (pathname === "/mock") {
    return <MockBonusPage />
  }

  if (showTerms) {
    return <TermsAndConditions onBack={() => setShowTerms(false)} />
  }

  return (
    <PopUpProvider>
      <div className="min-h-screen w-full bg-[#010100] text-white relative overflow-hidden font-bebas">
        {/* Componente de Debug de Tracking - solo en desarrollo */}
        {/* {import.meta.env.DEV && <TrackingDebug />} */}
        
        {/* Navbar - oculto los primeros 2 segundos */}
        <motion.nav
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -40 }}
          transition={{ duration: 0.7 }}
          className={`fixed w-full flex justify-center sm:justify-between items-center px-6 md:px-12 py-0 md:py-6 bg-[#010100] z-50 border-b-2 border-amber-500/30 ${showHeader ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{ display: showHeader ? "flex" : "none" }}
        >
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            {/*  <img
              src="https://mooneymaker.co/frontend/CSOFTV7/img/logo%20mooney.png"
              alt="Sportsbet Logo"
              className="h-20 md:h-24"
            /> */}
          </motion.div>
          <div className="flex items-center space-x-4 md:space-x-8 py-2">
            <button
              onClick={handleRegistration}
              className="text-sm text-white md:text-xl px-4 py-2 md:px-8 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center"
            >
              <LuCircleDashed className="text-lg md:text-3xl mr-2 md:mr-3" /> 
              <span className="hidden sm:inline">Registrarme YA</span>
              <span className="sm:hidden">Registrarme</span>
            </button>
          </div>
        </motion.nav>

        <main className="relative z-10 pt-32 md:pt-40">
          {/* Hero Section - 100% pantalla */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center px-6 py-20 md:py-32 bg-[#010100] flex flex-col items-center justify-center min-h-screen"
          >
            <AnimatePresence>
              {showHeader && (
                <motion.img
                  key="hero-logo"
                  src="https://mooneymaker.co/frontend/CSOFTV7/img/logo%20mooney.png"
                  alt="Mooney Maker Logo"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-32 md:h-40 mb-10 mx-auto"
                />
              )}
            </AnimatePresence>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-white"
            >
              EXPERIENCIA PREMIUM
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-12">
              Únete a la comunidad más exclusiva de entretenimiento
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button
                onClick={handleRegistration}
                className="text-xl max-w-md mx-auto md:text-2xl px-10 py-4 bg-white border border-1 border-[#E5DAB4] text-black font-bold rounded-full shadow-lg hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaGift className="text-3xl mr-3" /> Comenzar Ahora
              </button>
            </motion.div>
          </motion.section>

          {/* Why Join? Section - Cards with responsive behavior */}
          <section className="px-6 py-24 md:py-40 bg-[#010100] relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Columna izquierda: las 3 cards en vertical con comportamiento responsive */}
              <div className="flex flex-col gap-6 relative">
                {[
                  {
                    icon: FaGift,
                    title: "Bonos Premium",
                    desc: "Beneficios exclusivos para nuevos miembros.",
                  },
                  {
                    icon: GiLaurels,
                    title: "Experiencias Únicas",
                    desc: "Dinámicas especiales solo para ti.",
                  },
                  {
                    icon: FaRegIdCard,
                    title: "Acceso VIP",
                    desc: "Registro rápido y seguro.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className={`group relative bg-[#010100] border-2 border-amber-400/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center
                      text-white cursor-pointer select-none w-full
                      hover:border-amber-400/50
                      hover:scale-105 active:scale-100
                      lg:transform lg:-translate-x-[20%] lg:hover:translate-x-0
                      transition-all duration-300 ease-out
                      max-lg:transform-none max-lg:hover:transform-none
                    `}
                    style={{ transformOrigin: 'left center' }}
                  >
                    {/* Indicador visual solo en desktop */}
                    <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full w-2 h-12 bg-gradient-to-r from-amber-400/60 to-transparent rounded-r-full opacity-70 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <div className="flex flex-col items-center justify-center w-full mb-6">
                      <span className="text-4xl md:text-5xl text-white transition-all duration-300 group-hover:text-amber-400">
                        {React.createElement(benefit.icon, { className: "text-4xl md:text-5xl" })}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-amber-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-base md:text-lg font-medium group-hover:text-amber-100 transition-colors duration-300">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Columna derecha: imagen del oso */}
              <div className="flex justify-center items-center h-full">
                <motion.div
                  initial={isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, x: 200 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 1,
                    delay: isMobile ? 0.3 : 0.5,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  className="object-contain max-h-[100vh] max-w-3xl mx-auto rounded-2xl shadow-2xl w-full flex justify-center items-center relative px-5"
                >
                  <video
                    src="/video.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-2xl shadow-2xl object-contain"
                  />
                  {/* Overlay difuminado */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(0,0,0,0) 25%, rgba(0,0,0,0.8) 60%, #000 100%)"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-24 md:py-40 bg-[#010100]">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-20 text-white tracking-wide">
              ¿LISTO PARA COMENZAR?
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#E5DAB4]">
              ÚNETE AHORA Y OBTÉN ACCESO INMEDIATO A TODOS LOS BENEFICIOS
            </p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={showHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <button
                onClick={handleRegistration}
                className="group text-2xl md:text-3xl px-16 py-7 text-[#E5DAB4] border border-2 border-[#E5DAB4] rounded-full max-w-lg mx-auto font-bold shadow-lg hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-600 hover:text-white transition-all duration-300 flex items-center"
              >
                <FaGift className="text-4xl md:text-5xl mr-4 text-[#E5DAB4] group-hover:text-white transition-all duration-300" />{" "}
                Registrarme Ahora
              </button>
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#010100] border-t-2 border-amber-500/20 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-amber-100/60 text-sm">© 2024 Mooney Maker. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </PopUpProvider>
  )
}

// Componente principal que envuelve con el Provider
export default function App() {
  return (
    <TrackingProvider>
      <AppContent />
    </TrackingProvider>
  )
}

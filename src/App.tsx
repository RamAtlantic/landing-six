"use client";

import React, {
  useState,
  createContext,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift } from "react-icons/fa";
import { TermsAndConditions } from "./components/TermsAndConditions";
import MockBonusPage from "./pages/MockBonusPage";
import { LuCircleDashed } from "react-icons/lu";
import { sendMetaEvent } from "./services/metaEventService";
import { TrackingProvider, useUserTracking } from "./contexts/TrackingContext";
import { ContentSectionUpdated } from "./components/ContentSection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiUserPlus } from "react-icons/bi";
import { UserCheck } from "lucide-react";

const REGISTER_URL = import.meta.env.VITE_REGISTER_URL;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

interface PopUpContextType {
  isOpen: boolean;
  popUpContent: ReactNode | null;
  openPopUp: (content: ReactNode) => void;
  closePopUp: () => void;
}

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const PopUpProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState<ReactNode | null>(null);

  const openPopUp = (content: ReactNode) => {
    setPopUpContent(content);
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
    setPopUpContent(null);
  };

  return (
    <PopUpContext.Provider
      value={{ isOpen, popUpContent, openPopUp, closePopUp }}
    >
      {children}
    </PopUpContext.Provider>
  );
};

export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (context === undefined) {
    throw new Error("usePopUp must be used within a PopUpProvider");
  }
  return context;
};

// Hook para detectar si es mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

const carouselImages = [
  "https://mooneymaker.co/sliders/1-1733762599.png",
  /*   "https://mooneymaker.co/sliders/1-1733762690.png",
  "https://mooneymaker.co/sliders/1-1738683011.png",
  "https://mooneymaker.co/sliders/1-1738683031.png", */
  "https://mooneymaker.co/sliders/1-1733762767.png",
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
};

// Componente interno que usa el tracking
const AppContent = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const isMobile = useIsMobile();

  // Usar el tracking desde el context
  const { sendTrackingData, getVisitUid } = useUserTracking();

  useEffect(() => {
    const timer = setTimeout(() => setShowHeader(true), 5000);
    const handleScroll = () => {
      setShowHeader(true);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para manejar el registro y enviar evento a Meta
  const handleRegistration = async () => {
    try {
      // Generar un email temporal para el evento (en producción esto vendría del formulario de registro)
      const tempEmail = `user_${Date.now()}@example.com`;

      // Obtener el UID de la visita
      const visitUid = getVisitUid();

      // Enviar evento a Meta con el UID de la visita
      const success = await sendMetaEvent(
        tempEmail,
        import.meta.env.VITE_VALUE_PURCHASE || "132.52",
        visitUid
      );

      if (success) {
        console.log(
          "Evento de registro enviado exitosamente a Meta con UID:",
          visitUid
        );
      } else {
        console.warn("No se pudo enviar el evento a Meta");
      }

      // Enviar datos de tracking antes de redirigir
      try {
        await sendTrackingData();
        console.log("Datos de tracking enviados exitosamente");
      } catch (error) {
        console.warn("Error enviando datos de tracking:", error);
      }

      // Redirigir al usuario a la URL de registro
      window.location.href = REGISTER_URL;
    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      // Aún redirigir al usuario aunque falle el evento
      window.location.href = REGISTER_URL;
    }
  };

  // Simple routing based on pathname
  const pathname = window.location.pathname;

  if (pathname === "/mock") {
    return <MockBonusPage />;
  }

  if (showTerms) {
    return <TermsAndConditions onBack={() => setShowTerms(false)} />;
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
          className={`fixed w-full flex justify-center sm:justify-between items-center px-6 md:px-12 py-0 md:py-6 bg-transparent backdrop-blur-md backdrop-brightness-75 z-50 border-b-2 border-amber-500/30 ${showHeader ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{ display: showHeader ? "flex" : "none" }}
        >
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            {/*  <img
              src="https://mooneymaker.co/frontend/CSOFTV7/img/logo%20mooney.png"
              alt="Sportsbet Logo"
              className="h-20 md:h-24"
            /> */}
            
          </motion.div>
          <div className="flex items-center space-x-4 md:space-x-8 py-2">
            <button
              onClick={handleRegistration}
              className="text-sm text-white md:text-xl px-4 py-2 md:px-8 md:py-3 bg-gradient-to-r from-green-500 to-amber-600 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center"
            >
              <UserCheck className="text-lg md:text-3xl mr-2 md:mr-3" />
              <span className="">Tengo Usuario</span>
            </button>
          </div>
        </motion.nav>
        <ContentSectionUpdated />

        <main className="relative z-10 flex flex-col md:flex-row items-center justify-center mb-20">
          {/* Why Join? Section - Cards with responsive behavior */}

          <div className="flex flex-col items-center space-y-4">
            <img src="imageLogo.png" alt="" className="w-[150px] ml-3 h-auto z-20" />
            <video
              src="/output1.mp4"
              autoPlay
              loop
              muted
              playsInline
              width={500}
              height={500}
              className="max-w-full h-auto"
            />
          </div>
       
          {/* NEW SECTION */}
        </main>

        <div className="flex flex-col items-center justify-center">
           {/* Promotional Code Card with Disruptive Design */}
           <motion.div
              className="flex bg-blue-900 bg-opacity-50 rounded-lg p-4 md:p-8 border border-red-700 items-center justify-center flex-col relative overflow-hidden cursor-pointer group hover:border-red-500 hover:shadow-xl transition-all duration-500 ease-in-out"
              onClick={() => alert('Código promocional: PROMO250K')}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaGift className="text-3xl mb-4 text-red-400" />
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="bg-gradient-to-r from-blue-500 to-red-500 w-full h-full animate-pulse"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <motion.h3
                  className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-3 lg:mb-4 font-chango text-center group-hover:text-black"
                  whileHover={{
                    textShadow: "0 0 25px rgba(59, 130, 246, 0.7)",
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  OBTÉN TU CÓDIGO
                </motion.h3>

                <motion.p
                  className="text-xl lg:text-2xl text-white leading-tight text-center group-hover:text-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Y GANA UN DESCUENTO DE HASTA{" "}
                  <motion.span
                    className="font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
                    whileHover={{
                      textShadow: "0 0 20px rgba(239, 68, 68, 0.7)",
                      scale: 1.15,
                    }}
                  >
                    $250.000
                  </motion.span>
                </motion.p>
              </div>

              {/* Floating Particles Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-red-400 rounded-full opacity-0 group-hover:opacity-70"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-15, -35, -15],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>
            </motion.div>
        </div>
      
        {/* NEW SECTION CARROUSEL */}
        {/*   <section className="hidden md:block w-full mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black h-1/4 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black h-1/4 pointer-events-none"></div>
          <Slider {...carouselSettings}>
            {carouselImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </Slider>
        </section>
 */}
        {/* Teddy Bear Section */}
        <section className="py-20 bg-black relative">
          <div className="container mx-auto px-8 text-center">
            <div className="flex justify-center">
              <img
                src="/teddy-bear.png"
                alt="Teddy bear mascot with sunglasses"
                width={1000}
                height={1000}
                className="max-w-full h-auto -mb-20"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#010100] border-t-2 border-amber-500/20 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-amber-100/60 text-sm">
              © 2024 Mooney Maker. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </PopUpProvider>
  );
};

// Componente principal que envuelve con el Provider
export default function App() {
  return (
    <TrackingProvider>
      <AppContent />
    </TrackingProvider>
  );
}

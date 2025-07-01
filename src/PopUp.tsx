"use client"

import React, { useState, useEffect } from "react"
import PhonePopup from "./PhonePopUp"

// Define los eventos que pueden activar el popup
type TriggerEvent = "timeOnPage" | "scrollDepth" | "exitIntent" | "buttonClick" | "pageLoad"

interface PopupManagerProps {
  children: React.ReactNode
  initialDelay?: number // Retraso en ms antes de considerar los activadores
  timeThreshold?: number // Tiempo en ms para activar el popup
  scrollThreshold?: number // Porcentaje de desplazamiento para activar el popup
  disabled?: boolean // Para desactivar todos los popups
}

const PopupManager: React.FC<PopupManagerProps> = ({
  children,
  initialDelay = 2000,
  timeThreshold = 30000, // 30 segundos por defecto
  scrollThreshold = 50, // 50% de desplazamiento por defecto
  disabled = false,
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Comprobar si el popup se ha mostrado en esta sesión
  const [hasShownInSession, setHasShownInSession] = useState(false)

  // Inicializar después del retraso
  useEffect(() => {
    if (disabled) return

    const timer = setTimeout(() => {
      setInitialized(true)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay, disabled])

  // Activador de tiempo en la página
  useEffect(() => {
    if (!initialized || disabled || hasShownInSession) return

    const timer = setTimeout(() => {
      setShowPopup(true)
      setHasShownInSession(true)
    }, timeThreshold)

    return () => clearTimeout(timer)
  }, [initialized, timeThreshold, disabled, hasShownInSession])

  // Activador de profundidad de desplazamiento
  useEffect(() => {
    if (!initialized || disabled || hasShownInSession) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      if (scrollPercent >= scrollThreshold) {
        setShowPopup(true)
        setHasShownInSession(true)
        window.removeEventListener("scroll", handleScroll)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialized, scrollThreshold, disabled, hasShownInSession])

  // Activador de intención de salida
  useEffect(() => {
    if (!initialized || disabled || hasShownInSession) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true)
        setHasShownInSession(true)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [initialized, disabled, hasShownInSession])

  // Método para activar manualmente el popup (para clics de botón)
  const triggerPopup = () => {
    if (disabled) return

    setShowPopup(true)
    setHasShownInSession(true)
  }

  // Cerrar popup
  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      {/* Proveedor de contexto para permitir que los componentes hijos activen el popup */}
      <PopupContext.Provider value={{ triggerPopup }}>{children}</PopupContext.Provider>

      {/* El componente popup */}
      <PhonePopup isOpen={showPopup} onClose={closePopup} />
    </>
  )
}

// Crear contexto para permitir que los componentes hijos activen el popup
interface PopupContextType {
  triggerPopup: () => void
}

export const PopupContext = React.createContext<PopupContextType>({
  triggerPopup: () => {},
})

// Hook para usar el contexto del popup
export const usePopup = () => React.useContext(PopupContext)

export default PopupManager

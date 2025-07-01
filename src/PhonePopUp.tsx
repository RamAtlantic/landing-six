"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp, FaTimes, FaCheck } from "react-icons/fa"
import { MdSend } from "react-icons/md"

interface PhonePopupProps {
  isOpen: boolean
  onClose: () => void
}

const PhonePopup: React.FC<PhonePopupProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"input" | "success">("input")
  const [error, setError] = useState<string | null>(null)

  // Validar número de teléfono mientras el usuario escribe
  useEffect(() => {
    // Validación para números argentinos (10 dígitos, comenzando con código de área)
    const isValidPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phoneNumber)
    setIsValid(isValidPhone)
    if (phoneNumber && !isValidPhone) {
      setError("Ingresa un número de teléfono válido")
    } else {
      setError(null)
    }
  }, [phoneNumber])

  // Formatear número de teléfono mientras el usuario escribe
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir dígitos
    const value = e.target.value.replace(/\D/g, "")
    setPhoneNumber(value)
  }

  // Enviar mensaje de WhatsApp vía Twilio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) return
    
    setIsSubmitting(true)
    setError(null) // Reset error on new submission

    try {
      // Format phone number for the API (ensure E.164 format like +54911...)
      let formattedPhone = phoneNumber
      if (!formattedPhone.startsWith('+')) {
        // Assuming the API expects +54 followed by the number (including mobile 9 if applicable)
        formattedPhone = `+54${phoneNumber}` 
      }

      // Call your backend API endpoint
      const response = await fetch("http://localhost:3000/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          phone: formattedPhone, // Send the formatted number
        }),
      })

      if (!response.ok) {
        // Try to get error message from backend response
        let errorMsg = "Error al enviar el mensaje desde el servidor."
        try {
          const errorData = await response.json()
          errorMsg = errorData.error || errorMsg
        } catch (parseError) {
          // Ignore if response is not JSON
        }
        throw new Error(errorMsg)
      }

      // Mostrar mensaje de éxito
      setStep("success")
    } catch (err: any) {
      console.error("Error calling the send API:", err)
      setError(err.message || "No pudimos enviar el mensaje. Verifica tu conexión o intenta más tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#2c2c2c] rounded-xl overflow-hidden shadow-2xl border border-brand-green/30"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#212121] to-[#2a2a2a] p-4 border-b border-brand-green/20">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <FaTimes />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-brand-green rounded-full p-2 text-[#212121]">
                  <FaWhatsapp size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {step === "input" ? "Recibí tu código por WhatsApp" : "¡Mensaje enviado!"}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === "input" ? (
                <form onSubmit={handleSubmit}>
                  <p className="text-white/80 mb-4">
                    Ingresá tu número de teléfono para recibir un código exclusivo y acceder a beneficios especiales.
                  </p>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-1">
                      Número de teléfono
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Ej: 1123456789"
                        className={`w-full bg-[#3a3a3a] border ${
                          error ? "border-red-500" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50`}
                        autoFocus
                      />
                      {isValid && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        isValid && !isSubmitting
                          ? "bg-brand-green text-[#212121] hover:bg-brand-green/90"
                          : "bg-gray-600 text-white/50 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <MdSend />
                          <span>Enviar código</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-green-500" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">¡Código enviado!</h4>
                  <p className="text-white/70 mb-6">
                    Hemos enviado un mensaje a tu WhatsApp con el código y el link para utilizarlo.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-brand-green text-[#212121] rounded-lg font-medium hover:bg-brand-green/90 transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#252525] px-6 py-3 text-xs text-white/50 text-center">
              No compartiremos tu número con terceros. Aplican términos y condiciones.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PhonePopup

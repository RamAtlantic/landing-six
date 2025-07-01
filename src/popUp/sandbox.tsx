"use client"
import { FaWhatsapp, FaInfoCircle } from "react-icons/fa"

const WhatsAppSandbox = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-[#2c2c2c] rounded-lg shadow-lg border border-brand-green/30 p-4 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <FaWhatsapp className="text-[#25D366] text-xl" />
          <h4 className="font-bold text-white">Modo Sandbox</h4>
        </div>

        <div className="text-white/80 text-sm space-y-2">
          <p>Estás en modo de desarrollo. Los mensajes de WhatsApp no se enviarán realmente.</p>
          <div className="flex items-start gap-2 bg-[#3a3a3a] p-2 rounded">
            <FaInfoCircle className="text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-xs">
              Para enviar mensajes reales, necesitarás configurar una cuenta de Twilio con un número habilitado para
              WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-white/10 text-xs text-white/50">
          Este indicador solo aparece en desarrollo
        </div>
      </div>
    </div>
  )
}

export default WhatsAppSandbox

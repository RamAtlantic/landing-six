"use client"
import { usePopup } from "../PopUp"
import LoadingButton from "../components/LoadingButton"
import { FaUserPlus, FaWhatsapp } from "react-icons/fa"

const REGISTER_URL = "https://sportsbet.bet.ar/registrarse?utm_source=publi1lauguty&utm_brandaffiliate=publi1lauguty"

const CTASection = () => {
  const { triggerPopup } = usePopup()

  return (
    <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-[#212121] to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mb-6">¡Empezá a jugar ahora!</h2>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Registrate hoy y recibí beneficios exclusivos. Sumate a miles de usuarios que ya disfrutan de la mejor
          plataforma.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LoadingButton href={REGISTER_URL} variant="primary" className="w-full sm:w-auto">
            <FaUserPlus className="text-lg" /> Registrarme
          </LoadingButton>

          {/* Botón para activar el popup de WhatsApp */}
          <button
            onClick={triggerPopup}
            className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-lg" /> Recibir código por WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection

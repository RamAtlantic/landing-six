"use client"

import { motion } from "framer-motion"
import { FaGift } from "react-icons/fa"
import LoadingButton from "./LoadingButton"

const REGISTER_URL = "https://pba.sportsbet.bet.ar//registrarse?utm_source=publi1lauguty&utm_brandaffiliate=publi1lauguty"

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function CTASection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden px-4 py-16 md:py-24 bg-black"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 md:px-8">
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
        >
          EXPERIENCIA PREMIUM A UN CLIC
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl text-amber-100/80 max-w-3xl mx-auto mb-6 md:mb-8"
        >
          Únete ahora y accede a beneficios exclusivos por{" "}
          <span className="font-semibold text-amber-400">tiempo limitado</span>. Miles de usuarios ya están disfrutando de
          una experiencia única con recompensas premium y una comunidad selecta.
        </motion.p>

        <motion.p variants={fadeInUp} className="text-amber-100/90 text-lg md:text-xl font-semibold mb-6 md:mb-10">
          ¡REGISTRATE AHORA Y OBTÉN ACCESO INMEDIATO!
        </motion.p>

        <motion.div variants={fadeInUp} className="flex justify-center">
          <LoadingButton
            href={REGISTER_URL}
            variant="primary"
            className="px-8 py-4 md:px-12 md:py-5 text-xl md:text-2xl font-bold rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black"
          >
            <FaGift className="text-3xl" />
            <span>Registrarme Ahora</span>
          </LoadingButton>
        </motion.div>
      </div>
    </motion.section>
  )
}

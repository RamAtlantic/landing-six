import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GiScrollQuill } from 'react-icons/gi';
import { IoArrowBack } from 'react-icons/io5';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface TermsAndConditionsProps {
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen w-full bg-[#212121] relative overflow-hidden py-24 px-4"
    >
      {/* Elementos decorativos flotantes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 text-brand-green/10 text-6xl hidden md:block"
        >
          <GiScrollQuill />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-brand-green transition-colors duration-200 mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoArrowBack className="text-xl" />
          Volver
        </motion.button>

        <motion.div
          variants={fadeInUp}
          className="bg-[#212121]/80 backdrop-blur-sm border-2 border-brand-green rounded-xl p-6 md:p-8 mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-green text-center mb-6">
            Bases y Condiciones
          </h1>
          
          <div className="space-y-6 text-white">
            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">Encendé la magia (CASINO)</h2>
              <h3 className="text-xl font-semibold text-brand-green mb-3">CÓMO FUNCIONA</h3>
              <ul className="space-y-3 list-disc pl-6">
                <li>Hacé un primer depósito de $1.000 o superior y elegí el bono casino.</li>
                <li>Te acreditamos el bono por el 100% de tu depósito, con un tope de 250.000 (doscientos cincuenta mil) en bono para casino.</li>
                <li>Solo participan Tragamonedas seleccionados ubicados dentro de la categoría "Zona Bono".</li>
                <li>Para liberar el Bono, debés realizar apuestas que sumen un total equivalente a 40 veces el monto recibido como bono.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">Términos y condiciones</h2>
              <div className="space-y-4 text-sm md:text-base">
                <p>Sportsbet realiza esta promoción exclusivamente en el territorio de la Provincia de Buenos Aires y estará vigente desde las 00:00 horas del 01 de abril de 2025 hasta el 30 de junio de 2025 a las 23:59 horas. La misma será válida para utilizar únicamente en los juegos de tragamonedas seleccionados ubicados dentro de la categoría" Zona Bono", estando excluidos de la siguiente promoción los juegos de mesas en vivo, apuestas deportivas y cualquier otro producto que no esté incluido en la categoría" Zona Bono". Para participar, el usuario deberá ser mayor de 18 años de edad y estar registrado en el sitio https://sportsbet.bet.ar/.</p>
                
                <p>Para poder obtener el Bono será necesario realizar un depósito mínimo de mil pesos argentinos ($1.000.-), válido únicamente para el primer depósito que se haga en la cuenta. Se otorgará el 100% (cien por ciento) de ese monto depositado como bono para jugar, con un límite para el monto otorgado como bono de doscientos cincuenta mil (250.000.-). A modo de ejemplo: Si un usuario realiza un primer depósito de $1.000 durante la vigencia de la promoción, se le acreditarán $1.000 en dinero real y 1.000 en bono Casino.</p>

                <p>Este bono solamente se otorga por única vez por persona y DNI a los usuarios registrados en el sitio https://sportsbet.bet.ar/ . y depositen por primera vez en su cuenta durante la vigencia de la Promoción. Válida únicamente para el primer depósito de usuarios registrados que no hayan realizado depósitos previos desde la creación de su cuenta.</p>

                <p>El bono otorgado equivale al 100% (cien por ciento) del depósito realizado y será acreditado en la cuenta "bonos casino" del usuario. Para utilizarlo, primero deberá consumirse el saldo de dinero real. Una vez consumido este saldo, el usuario podrá jugar con el dinero de bono, el cual estará disponible exclusivamente para realizar apuestas en la categoría "zona bono", pero no podrá ser retirado. Las ganancias obtenidas con apuestas realizadas desde la cuenta "bonos casino" también se acreditarán en esta misma cuenta. Para convertir el saldo del bono en dinero real, el usuario deberá realizar apuestas por un valor total equivalente a cuarenta (40) veces el monto del bono otorgado (rollover x40). Si se cumple este requisito, el saldo restante en la cuenta de "bonos casino" pasará a la cuenta del usuario como dinero real, con un tope máximo de cien mil pesos argentinos ($100.000), pudiendo ser retirado o utilizado para seguir apostando. Solo se contabilizarán las apuestas en Tragamonedas de la categoría "zona bono "para alcanzar este requisito.</p>

                <p>Se consideran siete (7) días corridos a partir de la activación del bonus para cumplir con la condición de otorgamiento descrita en el punto 4. Superado este plazo sin cumplir con las condiciones indicadas en dicho punto, el bono quedará sin efecto, es decir cancelado.</p>

                <p>Si el saldo del bono es menor a $20 (veinte pesos argentinos), el bono se cancelará automáticamente y el monto restante se convertirá en dinero real.</p>

                <p>Este bono solamente se otorga por única vez por persona y DNI a los usuarios nuevos que se registren durante la fecha de vigencia de la promoción, Sólo se considerará el primer depósito realizado desde el inicio de su actividad en la plataforma. Este bono no es acumulable con otras promociones ni beneficios.</p>

                <p>El bono descrito en estas Bases y Condiciones será cancelado automáticamente si el usuario solicita un retiro antes de cumplir con los requisitos detallados en los puntos descritos, si vence el período de vigencia o si alcanza su fecha de expiración.</p>

                <p>La cancelación del bono implica la anulación de todas las ganancias obtenidas, así como de cualquier ganancia pendiente de acreditar generada con dinero de dicho bono.</p>

                <p>La identidad de un usuario final será determinada en base a los datos personales otorgados al momento de la registración. Esta Promoción no es acumulable con otras promociones, premios y/o beneficios. Si es detectado algún comportamiento sospechoso de fraude, el mismo no será asignado.</p>

                <p>Cualquier conducta hecha por el usuario que sea considerada como abusiva, en relación a cualquier oferta promocional de Sportsbet, será condición suficiente para no recibir el Bono o para que el mismo sea cancelado. La participación debe ser realizada exclusivamente por el usuario interesado. No se admitirán registros masivos gestionados por comercios, grupos organizados o terceros. Cualquier intento de participación a través de sistemas automatizados, macros u otros mecanismos que vulneren la transparencia del proceso será descalificado y no contabilizado. Si Sportsbet detecta indicios de actividad fraudulenta, podrá suspender o excluir al usuario de la promoción, restringir el acceso a su cuenta y/o suspender la promoción en cuestión, hasta completar las verificaciones necesarias.</p>

                <p>Sportsbet podrá solicitar a los usuarios que proporcionen documentación y/o pasos de verificación para prevenir el mal uso de esta Promoción antes de acreditar cualquier oferta, fondos de bono y/o ganancias.</p>

                <p>Los usuarios podrán consultar estas Bases en el Sitio. Las presentes Bases podrán ser modificadas por el Organizador, sin alterar la esencia de la Promoción ni afectar los derechos de los usuarios. Cualquier modificación será difundida a través de los mismos medios en que se difunda la Promoción.</p>

                <p>En ningún caso los usuarios podrán exigir el canje ni reemplazo ni sustitución del Bono por dinero u otros bienes o servicios distintos de los ofrecidos y establecidos en estas Bases. La participación en la Promoción implica la aceptación de estas Bases, así como de las decisiones que adopte el Organizador, conforme a derecho, sobre cualquier cuestión no prevista en las mismas. Sus decisiones son irrecurribles.</p>

                <p>La interpretación, validez y cumplimiento de estas Bases y de los derechos y deberes emergentes de las mismas, se regirán por las leyes de la República Argentina. Para cualquier controversia que pudiera derivarse de la realización de la Promoción los Participantes y el Organizador se someterán a la jurisdicción y competencia de los Tribunales de la Provincia de Buenos Aires.</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 
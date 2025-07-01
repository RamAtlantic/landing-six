import React from 'react';
import CongratulationsBonus from '../components/CongratulationsBonus';

const MockBonusPage = () => {
  const handleAcknowledge = () => {
    // In a real scenario, this might navigate back or close a modal
    console.log("Acknowledged bonus on mock page");
    alert("¡Volviendo a la página principal! (simulado)");
    window.location.href = '/'; // Simulate going back to home
  };

  const message = "¡Has ganado un bono por tu suscripción esta semana, has tenido suerte! Esperemos que sigas así, disfrútalo.";

  return (
    <CongratulationsBonus 
      name="Diego"
      bonusAmount={250000} 
      message={message}
      onAcknowledge={handleAcknowledge}
      // You could customize ctaText and ctaHref here too if needed
    />
  );
};

export default MockBonusPage; 
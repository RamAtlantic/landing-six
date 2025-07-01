import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  id?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  href,
  className,
  variant = 'primary',
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      window.location.href = href;
      // Reset loading state in case navigation fails or user returns
      setTimeout(() => setIsLoading(false), 1000);
    }, 800);
  };

  // Base classes applying to all variants
  const baseClasses =
    "relative overflow-hidden rounded-full px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 font-special-gothic"; // Added font

  // Variant specific classes
  const primaryClasses =
    "bg-brand-green text-[#212121] hover:bg-opacity-90 hover:shadow-brand-green/30";
  const secondaryClasses =
    "bg-transparent border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-[#212121]";

  // Spinner color classes based on variant
  const spinnerColor = variant === 'primary' ? 'border-[#212121]' : 'border-brand-green';

  return (
    <motion.a
      id={id}
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${
        variant === 'primary' ? primaryClasses : secondaryClasses
      } ${className || ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Ensure consistent animation state even while loading
      animate={{}}
      initial={false}
    >
      {/* Loading state overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-full" // inherit background
          >
            <div
              className={`h-6 w-6 animate-spin rounded-full border-b-2 ${spinnerColor}`}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Content - fades out when loading */}
      <motion.span
        className="flex items-center justify-center gap-2"
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
};

export default LoadingButton; 

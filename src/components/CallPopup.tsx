import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const CallPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCallClick = () => {
    window.open('tel:+919836599300', '_self');
  };

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <button
        onClick={handleCallClick}
        className="relative w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-500/40 focus:outline-none"
        aria-label="Call now"
      >
        <span className="absolute inset-0 rounded-full animate-pulse bg-blue-500/30" />
        <Phone className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10 popup-pulse" />
      </button>
    </div>
  );
};

export default CallPopup; 
import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const CallPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds (slightly before WhatsApp)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCallClick = () => {
    window.open('tel:+919836599300', '_self');
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="relative">
        <div className="bg-blue-600 rounded-2xl shadow-2xl border border-blue-500/20 backdrop-blur-sm p-3 md:p-4">
          <div className="flex items-center pr-4 md:pr-6">
            {/* Phone Icon */}
            <div className="relative">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mr-2 md:mr-3 shadow-lg">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                <span className="text-white font-semibold text-base md:text-lg truncate">Call Us</span>
                <div className="bg-blue-500 px-1.5 py-0.5 md:px-2 rounded-full">
                  <span className="text-white text-xs md:text-sm font-medium">24x7</span>
                </div>
              </div>
              <p className="text-white/90 text-xs md:text-sm leading-tight truncate">+91 98365 99300</p>
            </div>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="ml-2 text-white/70 hover:text-white transition-colors text-lg md:text-xl relative z-20"
              aria-label="Close call popup"
              style={{ pointerEvents: 'auto' }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Clickable overlay */}
          <button
            onClick={handleCallClick}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Call now"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        {/* Pulse animation */}
        <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default CallPopup; 
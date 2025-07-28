import React, { useState, useEffect } from 'react';

const WhatsAppPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+919836599300';
    const message = 'Hello! I need help with your products.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="relative">
        <div className="bg-green-600 rounded-2xl shadow-2xl border border-green-500/20 backdrop-blur-sm p-3 md:p-4">
          <div className="flex items-center pr-4 md:pr-6">
            {/* WhatsApp Icon */}
            <div className="relative">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center mr-2 md:mr-3 shadow-lg">
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                <span className="text-white font-semibold text-base md:text-lg truncate">Panna Combs</span>
                <div className="bg-green-500 px-1.5 py-0.5 md:px-2 rounded-full">
                  <span className="text-white text-xs md:text-sm font-medium">Online</span>
                </div>
              </div>
              <p className="text-white/90 text-xs md:text-sm leading-tight truncate">Need help? Chat via WhatsApp</p>
            </div>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="ml-2 text-white/70 hover:text-white transition-colors text-lg md:text-xl relative z-20"
              aria-label="Close popup"
              style={{ pointerEvents: 'auto' }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Clickable overlay, but ignore pointer events on the close button area */}
          <button
            onClick={handleWhatsAppClick}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Open WhatsApp chat"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        {/* Pulse animation */}
        <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default WhatsAppPopup; 
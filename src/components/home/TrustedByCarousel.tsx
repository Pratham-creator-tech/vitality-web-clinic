
const TrustedByCarousel = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-medium text-gray-700 mb-12 dark:text-gray-300">
          Trusted by world-class healthcare institutions
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-8 items-center whitespace-nowrap">
            {/* First set of logos */}
            {/* Cleveland Clinic */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 220 35" className="w-full h-full" fill="currentColor">
                  <g fill="#0067B1">
                    <path d="M75.5 14.7h-3.2v9.8h-2.4v-9.8h-3.2v-2h8.8v2zm9.6 9.8h-2.4v-5h-5v5h-2.4V12.7h2.4v4.8h5v-4.8h2.4v11.8zm12.3 0h-7.8V12.7h7.8v2h-5.4v2.8h5v2h-5v3h5.4v2zm14.9 0h-2.3l-5.2-8.1v8.1h-2.4V12.7h2.3l5.2 8.1v-8.1h2.4v11.8z"/>
                  </g>
                  <path fill="#00B5E2" d="M17.5 0h17.5v17.5H17.5z"/>
                  <path fill="#8DC63F" d="M0 17.5h17.5V35H0z"/>
                  <path fill="#0067B1" d="M17.5 17.5H35V35H17.5z"/>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Cleveland Clinic</span>
            </div>
            {/* NYU Langone */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#522D6D"/>
                  <text x="25" y="26" fill="white" fontSize="16" fontFamily="Arial Black">NYU LANGONE</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">NYU Langone</span>
            </div>
            {/* Mass General */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#003087"/>
                  <text x="20" y="26" fill="white" fontSize="14" fontFamily="Arial">MASS GENERAL</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Mass General</span>
            </div>
            {/* UCLA Health */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#347BAD"/>
                  <text x="30" y="26" fill="white" fontSize="16" fontFamily="Arial">UCLA Health</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">UCLA Health</span>
            </div>
            {/* Stanford Health */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#8C1515"/>
                  <text x="20" y="26" fill="white" fontSize="14" fontFamily="Arial">Stanford Health</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Stanford Health</span>
            </div>
            {/* UCSF Medical */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#052049"/>
                  <text x="30" y="26" fill="white" fontSize="16" fontFamily="Arial">UCSF Medical</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">UCSF Medical</span>
            </div>
            {/* Mayo Clinic */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#001F5B"/>
                  <text x="35" y="26" fill="white" fontSize="16" fontFamily="Arial">Mayo Clinic</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Mayo Clinic</span>
            </div>

            {/* Duplicate set for continuous scrolling */}
            {/* Cleveland Clinic */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 220 35" className="w-full h-full" fill="currentColor">
                  <g fill="#0067B1">
                    <path d="M75.5 14.7h-3.2v9.8h-2.4v-9.8h-3.2v-2h8.8v2zm9.6 9.8h-2.4v-5h-5v5h-2.4V12.7h2.4v4.8h5v-4.8h2.4v11.8zm12.3 0h-7.8V12.7h7.8v2h-5.4v2.8h5v2h-5v3h5.4v2zm14.9 0h-2.3l-5.2-8.1v8.1h-2.4V12.7h2.3l5.2 8.1v-8.1h2.4v11.8z"/>
                  </g>
                  <path fill="#00B5E2" d="M17.5 0h17.5v17.5H17.5z"/>
                  <path fill="#8DC63F" d="M0 17.5h17.5V35H0z"/>
                  <path fill="#0067B1" d="M17.5 17.5H35V35H17.5z"/>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Cleveland Clinic</span>
            </div>
            {/* NYU Langone */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#522D6D"/>
                  <text x="25" y="26" fill="white" fontSize="16" fontFamily="Arial Black">NYU LANGONE</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">NYU Langone</span>
            </div>
            {/* Mass General */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#003087"/>
                  <text x="20" y="26" fill="white" fontSize="14" fontFamily="Arial">MASS GENERAL</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Mass General</span>
            </div>
            {/* UCLA Health */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#347BAD"/>
                  <text x="30" y="26" fill="white" fontSize="16" fontFamily="Arial">UCLA Health</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">UCLA Health</span>
            </div>
            {/* Stanford Health */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#8C1515"/>
                  <text x="20" y="26" fill="white" fontSize="14" fontFamily="Arial">Stanford Health</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Stanford Health</span>
            </div>
            {/* UCSF Medical */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#052049"/>
                  <text x="30" y="26" fill="white" fontSize="16" fontFamily="Arial">UCSF Medical</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">UCSF Medical</span>
            </div>
            {/* Mayo Clinic */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 200 40" className="w-full h-full">
                  <path d="M10 8h180v24H10z" fill="#001F5B"/>
                  <text x="35" y="26" fill="white" fontSize="16" fontFamily="Arial">Mayo Clinic</text>
                </svg>
              </div>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Mayo Clinic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByCarousel;

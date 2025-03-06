
import { Link } from "react-router-dom";
import RamadanCountdown from "./RamadanCountdown";

const Navbar = () => {
  return (
    <header className="relative bg-ramadan-green text-white shadow-md">
      <div className="islamic-pattern">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-ramadan-gold mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-glow">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </div>
            <Link to="/" className="font-bold text-xl md:text-2xl tracking-tight flex items-center gap-1">
              <span className="text-white">റമദാൻ ഭോജൻ മിത്രം</span>
            </Link>
          </div>
          
          <RamadanCountdown />
          
          <nav className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/" className="text-white hover:text-ramadan-gold transition-colors duration-200">
              ഹോം
            </Link>
            <Link to="/mosques" className="text-white hover:text-ramadan-gold transition-colors duration-200">
              മസ്ജിദുകൾ
            </Link>
            <Link to="/add-mosque" className="inline-flex items-center bg-ramadan-gold text-ramadan-green px-4 py-2 rounded-md font-medium hover:bg-ramadan-gold/90 focus:outline-none focus:ring-2 focus:ring-ramadan-gold/50 focus:ring-offset-2 focus:ring-offset-ramadan-green transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              <span>പുതിയ മസ്ജിദ്</span>
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ramadan-gold/30 via-ramadan-gold to-ramadan-gold/30"></div>
    </header>
  );
};

export default Navbar;

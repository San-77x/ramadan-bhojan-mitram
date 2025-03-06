
import { Link, useNavigate } from "react-router-dom";
import RamadanCountdown from "./RamadanCountdown";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Globe, User, LogOut, Plus, Coffee } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              <span className="text-white">{t("footer.title")}</span>
            </Link>
          </div>
          
          <RamadanCountdown />
          
          <nav className="flex items-center space-x-2 md:space-x-4 mt-4 md:mt-0 flex-wrap justify-center">
            <Link to="/" className="text-white hover:text-ramadan-gold transition-colors duration-200 text-sm">
              {t("nav.home")}
            </Link>
            <Link to="/mosques" className="text-white hover:text-ramadan-gold transition-colors duration-200 text-sm">
              {t("nav.mosques")}
            </Link>
            <Link to="/gallery" className="text-white hover:text-ramadan-gold transition-colors duration-200 text-sm">
              {t("nav.gallery")}
            </Link>
            
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center text-white hover:text-ramadan-gold transition-colors duration-200 text-sm">
                    <Plus size={16} className="mr-1" />
                    <span>{t("common.add")}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/add-mosque" className="flex items-center">
                        <Plus size={14} className="mr-2" />
                        <span>{t("nav.addMosque")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/add-food" className="flex items-center">
                        <Coffee size={14} className="mr-2" />
                        <span>{t("nav.addFood")}</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center text-white hover:text-ramadan-gold transition-colors duration-200">
                    <User size={16} className="mr-1" />
                    <span className="max-w-[80px] truncate">{user?.name}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User size={14} className="mr-2" />
                        <span>{t("nav.profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-500">
                      <LogOut size={14} className="mr-2" />
                      <span>{t("nav.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login" className="inline-flex items-center bg-ramadan-gold text-ramadan-green px-4 py-2 rounded-md font-medium hover:bg-ramadan-gold/90 focus:outline-none focus:ring-2 focus:ring-ramadan-gold/50 focus:ring-offset-2 focus:ring-offset-ramadan-green transition-all duration-200 text-sm">
                <User size={16} className="mr-1" />
                <span>{t("nav.login")}</span>
              </Link>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center text-white hover:text-ramadan-gold transition-colors duration-200 ml-2">
                <Globe size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("ml")} className={language === "ml" ? "bg-ramadan-green/10 font-medium" : ""}>
                  മലയാളം
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-ramadan-green/10 font-medium" : ""}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ramadan-gold/30 via-ramadan-gold to-ramadan-gold/30"></div>
    </header>
  );
};

export default Navbar;

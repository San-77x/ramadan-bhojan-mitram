
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-ramadan-green/95 text-white py-12 islamic-pattern relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-ramadan-gold">{t("footer.title")}</h3>
            <p className="text-white/80 mb-4">
              റമദാൻ മാസത്തിൽ കേരളത്തിലെ മസ്ജിദുകളിൽ നിന്നും ലഭ്യമാകുന്ന ഭക്ഷണത്തെ കുറിച്ചുള്ള വിവരങ്ങൾ പങ്കുവെക്കാൻ സഹായിക്കുന്ന വെബ്സൈറ്റ്.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-ramadan-gold">{t("footer.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/mosques" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("nav.mosques")}
                </Link>
              </li>
              <li>
                <Link to="/add-mosque" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("nav.addMosque")}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-ramadan-gold">{t("footer.faq")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-ramadan-gold transition-colors duration-200">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} {t("footer.title")}. {t("footer.rights")}.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-ramadan-gold transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-white/60 hover:text-ramadan-gold transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-white/60 hover:text-ramadan-gold transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

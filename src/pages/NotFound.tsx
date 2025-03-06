
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ramadan-cream">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="inline-block text-ramadan-gold mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"></rect>
              <path d="M9 11v5"></path>
              <path d="M15 11v5"></path>
              <path d="M9 11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"></path>
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-ramadan-green">404</h1>
          <p className="text-xl text-ramadan-green/80 mb-8">
            ക്ഷമിക്കണം, ഈ പേജ് കണ്ടെത്താനായില്ല
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-ramadan-green text-white px-6 py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            ഹോം പേജിലേക്ക് മടങ്ങുക
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

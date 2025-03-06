
import { useState } from "react";
import { Link } from "react-router-dom";
import { sampleMosques } from "../utils/malayalamDistricts";
import SearchBar from "../components/SearchBar";
import MosqueCard from "../components/MosqueCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  const [filteredMosques, setFilteredMosques] = useState(sampleMosques);
  
  const handleSearch = (filters: {
    district: string;
    date: string;
    foodType: string;
    keyword: string;
  }) => {
    // In a real app, this would query a database
    // For now, just filter the sample data
    const filtered = sampleMosques.filter((mosque) => {
      if (filters.district && mosque.district !== filters.district) return false;
      if (filters.date && mosque.date !== filters.date) return false;
      if (filters.foodType && mosque.foodType !== filters.foodType) return false;
      if (
        filters.keyword &&
        !mosque.name.toLowerCase().includes(filters.keyword.toLowerCase())
      )
        return false;
      return true;
    });
    
    setFilteredMosques(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ramadan-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 islamic-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ramadan-green to-ramadan-green/80 opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <div className="inline-block text-ramadan-gold mb-3 opacity-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-ramadan-green leading-tight">
                റമദാൻ ഭക്ഷണ പങ്കിടൽ പ്ലാറ്റ്‌ഫോം
              </h1>
              
              <p className="text-lg md:text-xl text-ramadan-green/80 mb-6">
                Connecting Mosques and Communities in Kerala
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/add-mosque"
                  className="inline-flex items-center bg-ramadan-green text-white px-6 py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  <span>പുതിയ മസ്ജിദ് ചേർക്കുക</span>
                </Link>
                
                <Link
                  to="/mosques"
                  className="inline-flex items-center bg-white text-ramadan-green border border-ramadan-green/30 px-6 py-3 rounded-md font-medium hover:bg-ramadan-green/5 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span>എല്ലാ മസ്ജിദുകളും കാണുക</span>
                </Link>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute left-4 bottom-4 text-ramadan-gold opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </div>
            <div className="absolute right-4 top-4 text-ramadan-gold opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>
        </section>
        
        {/* Recent Mosque Listings */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-ramadan-green">
                സമീപകാല മസ്ജിദ് ചേർക്കലുകൾ
              </h2>
              
              <Link
                to="/mosques"
                className="text-ramadan-green hover:text-ramadan-green/80 transition-colors flex items-center text-sm font-medium"
              >
                എല്ലാം കാണുക
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMosques.slice(0, 3).map((mosque) => (
                <MosqueCard key={mosque.id} mosque={mosque} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Feature Section */}
        <section className="py-12 bg-ramadan-green/5 islamic-pattern">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-block text-ramadan-gold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                  <path d="M7 7h.01"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-ramadan-green mb-4">
                പ്രധാന സവിശേഷതകൾ
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-ramadan-green/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-ramadan-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-ramadan-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-ramadan-green">കണ്ടെത്തുക</h3>
                  <p className="text-gray-600">
                    നിങ്ങളുടെ പ്രദേശത്തെ മസ്ജിദുകളിൽ ലഭ്യമായ ഭക്ഷണവിവരങ്ങൾ എളുപ്പത്തിൽ കണ്ടെത്തുക.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-ramadan-green/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-ramadan-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-ramadan-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-ramadan-green">പങ്കിടുക</h3>
                  <p className="text-gray-600">
                    മസ്ജിദുകളിലെ ഭക്ഷണ വിവരങ്ങൾ സമൂഹവുമായി എളുപ്പത്തിൽ പങ്കിടുക.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-ramadan-green/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-ramadan-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-ramadan-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="22" x2="4" y2="15"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-ramadan-green">സ്ഥിരീകരിക്കുക</h3>
                  <p className="text-gray-600">
                    നിങ്ങളുടെ സമീപത്തുള്ള മസ്ജിദുകളിലെ ഭക്ഷണ ലഭ്യത സ്ഥിരീകരിക്കുക.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

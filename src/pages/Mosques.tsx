
import { useState, useEffect } from "react";
import { sampleMosques, MosqueData } from "../utils/malayalamDistricts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MosqueCard from "../components/MosqueCard";

const Mosques = () => {
  const [mosques, setMosques] = useState<MosqueData[]>([]);
  const [filteredMosques, setFilteredMosques] = useState<MosqueData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setMosques(sampleMosques);
      setFilteredMosques(sampleMosques);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (filters: {
    district: string;
    date: string;
    foodType: string;
    keyword: string;
  }) => {
    // Filter mosques based on search criteria
    const filtered = mosques.filter((mosque) => {
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
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ramadan-green mb-4 text-center">
              മസ്ജിദുകൾ കണ്ടെത്തുക
            </h1>
            <p className="text-center text-ramadan-green/70 max-w-2xl mx-auto mb-8">
              കേരളത്തിലെ മസ്ജിദുകളിൽ ലഭ്യമാകുന്ന ഭക്ഷണത്തെ കുറിച്ചുള്ള വിവരങ്ങൾ കണ്ടെത്തുക.
            </p>
            
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} isCompact={true} />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-ramadan-green">
                മസ്ജിദുകളുടെ പട്ടിക ({filteredMosques.length})
              </h2>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                    <div className="bg-gray-200 h-14 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMosques.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMosques.map((mosque) => (
                  <MosqueCard key={mosque.id} mosque={mosque} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-ramadan-green/10 text-ramadan-green mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-ramadan-green mb-2">
                  ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല
                </h3>
                <p className="text-ramadan-green/70">
                  നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങൾ മാറ്റി വീണ്ടും ശ്രമിക്കുക.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mosques;

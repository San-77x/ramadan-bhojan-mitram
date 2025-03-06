
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { keralaDistricts, foodTypes, frequencyOptions } from "../utils/malayalamDistricts";
import { getDefaultDate } from "../utils/dateUtils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const mosques = [
  { id: "1", name: "Palayam Juma Masjid" },
  { id: "2", name: "Padmanabha Masjid" },
  { id: "3", name: "Beemapally Mosque" },
  { id: "4", name: "Chengannur Masjid" },
  { id: "5", name: "Kozhikode Makhdum Mosque" },
];

const AddFood = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    mosqueName: "",
    district: "",
    foodDetails: "",
    foodType: "",
    date: getDefaultDate(),
    frequency: "single",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.mosqueName || !formData.district || !formData.foodDetails || !formData.foodType) {
      toast.error("ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("ഭക്ഷണ വിവരങ്ങൾ വിജയകരമായി ചേർത്തു!");
      setIsSubmitting(false);
      navigate("/mosques");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ramadan-cream">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-ramadan-green mb-2">
                {t("addFood.title")}
              </h1>
              <p className="text-ramadan-green/70">
                റമദാൻ മാസത്തിൽ മസ്ജിദുകളിൽ ലഭ്യമാകുന്ന ഭക്ഷണത്തെ കുറിച്ചുള്ള വിവരങ്ങൾ പങ്കുവെക്കുക.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="mosqueName" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("addFood.mosque")}
                  </label>
                  <select
                    id="mosqueName"
                    name="mosqueName"
                    value={formData.mosqueName}
                    onChange={handleChange}
                    className="ramadan-input w-full"
                    required
                  >
                    <option value="" disabled>
                      മസ്ജിദ് തിരഞ്ഞെടുക്കുക
                    </option>
                    {mosques.map(mosque => (
                      <option key={mosque.id} value={mosque.id}>
                        {mosque.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("addMosque.location")}
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="ramadan-input w-full"
                    required
                  >
                    <option value="" disabled>
                      ജില്ല തിരഞ്ഞെടുക്കുക
                    </option>
                    {keralaDistricts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="foodDetails" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("addFood.foodDetails")}
                  </label>
                  <textarea
                    id="foodDetails"
                    name="foodDetails"
                    value={formData.foodDetails}
                    onChange={handleChange}
                    placeholder="ഉദാ: ബിരിയാണി, കഞ്ഞി, പുട്ട്, കടല കറി, തുടങ്ങിയവ"
                    className="ramadan-input w-full min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="foodType" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("addFood.foodType")}
                  </label>
                  <select
                    id="foodType"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    className="ramadan-input w-full"
                    required
                  >
                    <option value="" disabled>
                      ഭക്ഷണ തരം തിരഞ്ഞെടുക്കുക
                    </option>
                    {foodTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("addFood.date")}
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="ramadan-input w-full"
                    min="2025-03-06"
                    max="2025-04-04"
                    required
                  />
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-ramadan-green mb-3">
                    ഒറ്റത്തവണയോ അല്ലെങ്കിൽ എല്ലാ ദിവസവും?
                  </span>
                  <div className="flex gap-4">
                    {frequencyOptions.map((option) => (
                      <label key={option.id} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="frequency"
                          value={option.id}
                          checked={formData.frequency === option.id}
                          onChange={handleChange}
                          className="w-4 h-4 text-ramadan-green border-gray-300 focus:ring-ramadan-green/30"
                        />
                        <span className="ml-2 text-gray-700">{option.name}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.frequency === "single" 
                      ? "* ഒറ്റത്തവണ: 24 മണിക്കൂറിനുശേഷം പോസ്റ്റ് കാലഹരണപ്പെടും" 
                      : "* എല്ലാ ദിവസവും: റമദാൻ അവസാനിക്കുന്നത് വരെ പോസ്റ്റ് സജീവമായിരിക്കും"}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-ramadan-gold/10">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-ramadan-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-ramadan-green/70">
                    <p>പോസ്റ്റ് ചെയ്യുന്നത്: <span className="font-medium text-ramadan-green">{user?.name}</span></p>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ramadan-green text-white py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      സമർപ്പിക്കുന്നു...
                    </>
                  ) : (
                    "സമർപ്പിക്കുക"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddFood;


import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ml" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  ml: {
    // Navigation
    "nav.home": "ഹോം",
    "nav.mosques": "മസ്ജിദുകൾ",
    "nav.addMosque": "പുതിയ മസ്ജിദ്",
    "nav.addFood": "ഭക്ഷണം ചേർക്കുക",
    "nav.gallery": "ഗാലറി",
    "nav.login": "ലോഗിൻ",
    "nav.register": "രജിസ്റ്റർ",
    "nav.logout": "ലോഗ്‌ഔട്ട്",
    "nav.profile": "പ്രൊഫൈൽ",
    
    // Home page
    "home.title": "റമദാൻ ഭോജൻ മിത്രം",
    "home.subtitle": "കേരളത്തിലെ മസ്ജിദുകളും സമൂഹങ്ങളും തമ്മിൽ ബന്ധിപ്പിക്കുന്നു",
    "home.search": "തിരയുക",
    
    // Footer
    "footer.title": "റമദാൻ ഭോജൻ മിത്രം",
    "footer.about": "ഞങ്ങളെ കുറിച്ച്",
    "footer.contact": "ഞങ്ങളെ ബന്ധപ്പെടുക",
    "footer.terms": "നിബന്ധനകൾ",
    "footer.privacy": "സ്വകാര്യതാ നയം",
    "footer.faq": "പതിവ് ചോദ്യങ്ങൾ",
    "footer.rights": "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം",
    
    // Auth
    "auth.login": "ലോഗിൻ",
    "auth.register": "രജിസ്റ്റർ",
    "auth.email": "ഇമെയിൽ",
    "auth.password": "പാസ്‌വേർഡ്",
    "auth.confirmPassword": "പാസ്‌വേർഡ് സ്ഥിരീകരിക്കുക",
    "auth.forgotPassword": "പാസ്‌വേർഡ് മറന്നുപോയോ?",
    "auth.newAccount": "പുതിയ അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    "auth.loginPrompt": "നിങ്ങൾക്ക് ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ടോ?",
    
    // Profile
    "profile.title": "പ്രൊഫൈൽ",
    "profile.name": "പേര്",
    "profile.email": "ഇമെയിൽ",
    "profile.phone": "ഫോൺ നമ്പർ",
    "profile.changePassword": "പാസ്‌വേർഡ് മാറ്റുക",
    "profile.updateProfile": "പ്രൊഫൈൽ അപ്‌ഡേറ്റ് ചെയ്യുക",
    
    // Add Mosque
    "addMosque.title": "പുതിയ മസ്ജിദ് ചേർക്കുക",
    "addMosque.subtitle": "റമദാൻ മാസത്തിൽ മസ്ജിദുകളിൽ ലഭ്യമാകുന്ന ഭക്ഷണത്തെ കുറിച്ചുള്ള വിവരങ്ങൾ പങ്കുവെക്കുക.",
    "addMosque.name": "മസ്ജിദിന്റെ പേര്",
    "addMosque.location": "സ്ഥലം",
    "addMosque.submit": "സമർപ്പിക്കുക",
    
    // Add Food
    "addFood.title": "ഭക്ഷണ വിവരങ്ങൾ ചേർക്കുക",
    "addFood.mosque": "മസ്ജിദ്",
    "addFood.foodDetails": "ലഭ്യമായ ഭക്ഷണം",
    "addFood.foodType": "ഭക്ഷണ തരം",
    "addFood.date": "തീയതി",
    "addFood.frequency": "ആവൃത്തി",
    "addFood.submit": "സമർപ്പിക്കുക",
    
    // Gallery
    "gallery.title": "ഗാലറി",
    "gallery.subtitle": "ഉപയോക്താക്കളുടെ അനുഭവങ്ങളും ഫോട്ടോകളും",
    "gallery.addReview": "അഭിപ്രായം ചേർക്കുക",
    "gallery.mosque": "മസ്ജിദ്",
    "gallery.comment": "അഭിപ്രായം",
    "gallery.uploadPhoto": "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
    
    // Common
    "common.search": "തിരയുക",
    "common.submit": "സമർപ്പിക്കുക",
    "common.cancel": "റദ്ദാക്കുക",
    "common.save": "സംരക്ഷിക്കുക",
    "common.loading": "ലോഡ് ചെയ്യുന്നു...",
    "common.error": "പിശക് സംഭവിച്ചു",
    "common.success": "വിജയകരമായി പൂർത്തിയാക്കി",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.mosques": "Mosques",
    "nav.addMosque": "Add Mosque",
    "nav.addFood": "Add Food",
    "nav.gallery": "Gallery",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "nav.profile": "Profile",
    
    // Home page
    "home.title": "Ramadan Food Friend",
    "home.subtitle": "Connecting Mosques and Communities in Kerala",
    "home.search": "Search",
    
    // Footer
    "footer.title": "Ramadan Food Friend",
    "footer.about": "About Us",
    "footer.contact": "Contact Us",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.faq": "FAQ",
    "footer.rights": "All Rights Reserved",
    
    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.forgotPassword": "Forgot Password?",
    "auth.newAccount": "Create New Account",
    "auth.loginPrompt": "Already have an account?",
    
    // Profile
    "profile.title": "Profile",
    "profile.name": "Name",
    "profile.email": "Email",
    "profile.phone": "Phone Number",
    "profile.changePassword": "Change Password",
    "profile.updateProfile": "Update Profile",
    
    // Add Mosque
    "addMosque.title": "Add New Mosque",
    "addMosque.subtitle": "Share information about food available at mosques during Ramadan.",
    "addMosque.name": "Mosque Name",
    "addMosque.location": "Location",
    "addMosque.submit": "Submit",
    
    // Add Food
    "addFood.title": "Add Food Information",
    "addFood.mosque": "Mosque",
    "addFood.foodDetails": "Food Available",
    "addFood.foodType": "Food Type",
    "addFood.date": "Date",
    "addFood.frequency": "Frequency",
    "addFood.submit": "Submit",
    
    // Gallery
    "gallery.title": "Gallery",
    "gallery.subtitle": "User Experiences and Photos",
    "gallery.addReview": "Add Review",
    "gallery.mosque": "Mosque",
    "gallery.comment": "Comment",
    "gallery.uploadPhoto": "Upload Photo",
    
    // Common
    "common.search": "Search",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Successfully completed",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "ml",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ml");
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

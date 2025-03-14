
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("വിജയകരമായി ലോഗിൻ ചെയ്തു!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("ലോഗിൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ramadan-cream">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-ramadan-green mb-2">
                {t("auth.login")}
              </h1>
              <p className="text-ramadan-green/70">
                {t("auth.loginPrompt")}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ramadan-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-ramadan-green mb-1">
                    {t("auth.password")}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ramadan-input w-full"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/forgot-password" className="text-ramadan-green hover:text-ramadan-green/80">
                      {t("auth.forgotPassword")}
                    </Link>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-ramadan-green text-white py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("common.loading")}
                    </>
                  ) : (
                    t("auth.login")
                  )}
                </button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    {t("auth.loginPrompt")}
                    <Link to="/register" className="text-ramadan-green font-medium ml-1 hover:text-ramadan-green/80">
                      {t("auth.register")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;

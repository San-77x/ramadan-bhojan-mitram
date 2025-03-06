
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, KeyIcon, UserIcon } from "lucide-react";

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const { t } = useLanguage();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);
    
    try {
      await updateProfile({ name, email, phone });
      toast.success("പ്രൊഫൈൽ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!");
    } catch (error) {
      toast.error("പ്രൊഫൈൽ അപ്‌ഡേറ്റ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("പാസ്‌വേർഡുകൾ പൊരുത്തപ്പെടുന്നില്ല");
      return;
    }
    
    setIsPasswordLoading(true);
    
    try {
      await changePassword(oldPassword, newPassword);
      toast.success("പാസ്‌വേർഡ് വിജയകരമായി മാറ്റി!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("പാസ്‌വേർഡ് മാറ്റുന്നതിൽ പരാജയപ്പെട്ടു.");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setAvatarFile(file);
    
    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!avatarFile) {
      toast.error("ഒരു ചിത്രം തിരഞ്ഞെടുക്കുക");
      return;
    }
    
    // In a real app, you would upload the file to a server
    // For demo purposes, we'll just update the user's avatar
    setIsProfileLoading(true);
    
    setTimeout(() => {
      if (avatar) {
        updateProfile({ avatar });
        toast.success("അവതാർ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!");
      }
      setIsProfileLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ramadan-cream">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-ramadan-green mb-2">
                {t("profile.title")}
              </h1>
              <p className="text-ramadan-green/70">
                {t("profile.updateProfile")}
              </p>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserIcon size={16} />
                  <span>{t("profile.title")}</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <KeyIcon size={16} />
                  <span>{t("profile.changePassword")}</span>
                </TabsTrigger>
                <TabsTrigger value="avatar" className="flex items-center gap-2">
                  <ImageIcon size={16} />
                  <span>അവതാർ</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ramadan-green mb-1">
                        {t("profile.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="ramadan-input w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ramadan-green mb-1">
                        {t("profile.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ramadan-input w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ramadan-green mb-1">
                        {t("profile.phone")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="ramadan-input w-full"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isProfileLoading}
                      className="w-full bg-ramadan-green text-white py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProfileLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t("common.loading")}
                        </>
                      ) : (
                        t("common.save")
                      )}
                    </button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="password">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label htmlFor="oldPassword" className="block text-sm font-medium text-ramadan-green mb-1">
                        നിലവിലെ പാസ്‌വേർഡ്
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="ramadan-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-ramadan-green mb-1">
                        പുതിയ പാസ്‌വേർഡ്
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="ramadan-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-ramadan-green mb-1">
                        പാസ്‌വേർഡ് സ്ഥിരീകരിക്കുക
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="ramadan-input w-full"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isPasswordLoading}
                      className="w-full bg-ramadan-green text-white py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isPasswordLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t("common.loading")}
                        </>
                      ) : (
                        t("profile.changePassword")
                      )}
                    </button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="avatar">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <form onSubmit={handleAvatarUpload} className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-ramadan-green/10 mb-4 border-4 border-ramadan-green/20">
                        {avatar ? (
                          <img src={avatar} alt="User avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-ramadan-green/40">
                            <UserIcon size={64} />
                          </div>
                        )}
                      </div>
                      
                      <label htmlFor="avatar" className="cursor-pointer inline-flex items-center px-4 py-2 bg-ramadan-gold/80 text-ramadan-green rounded-md hover:bg-ramadan-gold transition-colors">
                        <ImageIcon size={16} className="mr-2" />
                        <span>ഫോട്ടോ തിരഞ്ഞെടുക്കുക</span>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isProfileLoading || !avatarFile}
                      className="w-full bg-ramadan-green text-white py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProfileLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t("common.loading")}
                        </>
                      ) : (
                        "അവതാർ സംരക്ഷിക്കുക"
                      )}
                    </button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

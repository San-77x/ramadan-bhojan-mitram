
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Camera, Heart, MessageSquare, Star, ThumbsDown, ThumbsUp } from "lucide-react";

type GalleryItem = {
  id: string;
  mosqueName: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  image: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
};

const mockGalleryItems: GalleryItem[] = [
  {
    id: "1",
    mosqueName: "Palayam Juma Masjid",
    userName: "Ahmed",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "ഇവിടെയുള്ള ബിരിയാണി വളരെ രുചികരമാണ്. എല്ലാവരും ഒരിക്കലെങ്കിലും പരീക്ഷിക്കണം.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069fc07b?q=80&w=1000&auto=format&fit=crop",
    likes: 24,
    dislikes: 3,
    createdAt: new Date("2025-03-10"),
  },
  {
    id: "2",
    mosqueName: "Beemapally Mosque",
    userName: "Fatima",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "റമദാൻ സമയത്ത് ഇവിടെ നല്ല കൂട്ടായ്മ അനുഭവപ്പെടുന്നു. ഭക്ഷണവും വളരെ നല്ലതാണ്.",
    image: "https://images.unsplash.com/photo-1531947044935-8599856c059c?q=80&w=1000&auto=format&fit=crop",
    likes: 42,
    dislikes: 1,
    createdAt: new Date("2025-03-12"),
  },
  {
    id: "3",
    mosqueName: "Kozhikode Makhdum Mosque",
    userName: "Muhammed",
    userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    comment: "കോഴിക്കോട്ടെ ഈ മസ്ജിദിലെ ഫുഡ് അടിപൊളി ആയിരുന്നു. ഇനിയും വരും.",
    image: "https://images.unsplash.com/photo-1574164052277-b9ea797de8e4?q=80&w=1000&auto=format&fit=crop",
    likes: 36,
    dislikes: 0,
    createdAt: new Date("2025-03-15"),
  },
];

const Gallery = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states for adding a new review
  const [mosqueName, setMosqueName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("ദയവായി ആദ്യം ലോഗിൻ ചെയ്യുക");
      navigate("/login");
      return;
    }
    
    if (!mosqueName || !comment || !image) {
      toast.error("ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new gallery item
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        mosqueName,
        userName: user?.name || "Anonymous",
        userAvatar: user?.avatar,
        comment,
        image: imagePreview || "",
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
      };
      
      setGalleryItems([newItem, ...galleryItems]);
      
      // Reset form
      setMosqueName("");
      setComment("");
      setImage(null);
      setImagePreview(null);
      
      toast.success("അഭിപ്രായം വിജയകരമായി ചേർത്തു!");
      setIsLoading(false);
    }, 1500);
  };
  
  const handleLike = (id: string) => {
    if (!isAuthenticated) {
      toast.error("ദയവായി ആദ്യം ലോഗിൻ ചെയ്യുക");
      return;
    }
    
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };
  
  const handleDislike = (id: string) => {
    if (!isAuthenticated) {
      toast.error("ദയവായി ആദ്യം ലോഗിൻ ചെയ്യുക");
      return;
    }
    
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, dislikes: item.dislikes + 1 } : item
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-ramadan-cream">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-ramadan-green mb-2">
              {t("gallery.title")}
            </h1>
            <p className="text-ramadan-green/70 max-w-2xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 flex justify-center">
              <Dialog>
                <DialogTrigger className="inline-flex items-center bg-ramadan-green text-white px-6 py-3 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 focus:ring-offset-2 focus:ring-offset-ramadan-cream transition-all duration-200">
                  <Camera className="mr-2 h-5 w-5" />
                  <span>{t("gallery.addReview")}</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-ramadan-green">
                      {t("gallery.addReview")}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitReview} className="space-y-6 mt-4">
                    <div>
                      <label htmlFor="mosque" className="block text-sm font-medium text-ramadan-green mb-1">
                        {t("gallery.mosque")}
                      </label>
                      <input
                        type="text"
                        id="mosque"
                        value={mosqueName}
                        onChange={(e) => setMosqueName(e.target.value)}
                        className="ramadan-input w-full"
                        placeholder="മസ്ജിദിന്റെ പേര്"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-ramadan-green mb-1">
                        {t("gallery.comment")}
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="ramadan-input w-full min-h-[100px]"
                        placeholder="നിങ്ങളുടെ അഭിപ്രായം ഇവിടെ എഴുതുക..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="photo" className="block text-sm font-medium text-ramadan-green mb-1">
                        {t("gallery.uploadPhoto")}
                      </label>
                      
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-ramadan-green/30 px-6 py-10">
                        <div className="text-center">
                          {imagePreview ? (
                            <div className="mb-4">
                              <img src={imagePreview} alt="Preview" className="mx-auto h-40 w-40 object-cover rounded" />
                            </div>
                          ) : (
                            <div className="mx-auto flex justify-center text-ramadan-green/40">
                              <Camera className="h-12 w-12" />
                            </div>
                          )}
                          <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="photo"
                              className="relative cursor-pointer rounded-md bg-ramadan-gold/70 px-3 py-2 text-ramadan-green font-semibold hover:bg-ramadan-gold"
                            >
                              <span>{imagePreview ? 'മറ്റൊരു ഫോട്ടോ തിരഞ്ഞെടുക്കുക' : 'ഫോട്ടോ തിരഞ്ഞെടുക്കുക'}</span>
                              <input id="photo" name="photo" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                            </label>
                          </div>
                        </div>
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
                          സമർപ്പിക്കുന്നു...
                        </>
                      ) : (
                        "അഭിപ്രായം സമർപ്പിക്കുക"
                      )}
                    </button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.mosqueName} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-ramadan-gold/10">
                        {item.userAvatar ? (
                          <img src={item.userAvatar} alt={item.userName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-ramadan-gold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-ramadan-green">{item.userName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString('ml-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-ramadan-green mb-2">{item.mosqueName}</h3>
                    
                    <p className="text-gray-700 mb-4">{item.comment}</p>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(item.id)} 
                          className="flex items-center gap-1 text-gray-600 hover:text-ramadan-green transition-colors"
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span>{item.likes}</span>
                        </button>
                        
                        <button 
                          onClick={() => handleDislike(item.id)} 
                          className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <ThumbsDown className="w-5 h-5" />
                          <span>{item.dislikes}</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-1 text-ramadan-gold">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;

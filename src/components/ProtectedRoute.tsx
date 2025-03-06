
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("ദയവായി ആദ്യം ലോഗിൻ ചെയ്യുക", {
        description: "ഈ വിഭാഗം ആക്സസ് ചെയ്യാൻ ലോഗിൻ ആവശ്യമാണ്",
      });
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ramadan-cream">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-ramadan-green/30 border-t-ramadan-green rounded-full animate-spin mb-4"></div>
          <p className="text-ramadan-green">ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

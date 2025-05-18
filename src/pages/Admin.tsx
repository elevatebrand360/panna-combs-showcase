
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductManagement from "@/components/admin/ProductManagement";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState<number | null>(null);
  const { toast } = useToast();

  // Session timeout (15 minutes)
  useEffect(() => {
    let sessionTimer: number | null = null;
    
    if (isAuthenticated) {
      sessionTimer = window.setTimeout(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("admin-auth");
        localStorage.removeItem("admin-auth-time");
        toast({
          title: "Session expired",
          description: "Your session has expired for security reasons. Please login again.",
        });
      }, 15 * 60 * 1000); // 15 minutes
    }
    
    return () => {
      if (sessionTimer) clearTimeout(sessionTimer);
    };
  }, [isAuthenticated, toast]);

  // Check if admin is locked out
  useEffect(() => {
    const lockedUntil = localStorage.getItem("admin-locked-until");
    if (lockedUntil) {
      const lockedTime = parseInt(lockedUntil);
      const now = new Date().getTime();
      
      if (lockedTime > now) {
        setIsLocked(true);
        const remainingTime = Math.ceil((lockedTime - now) / 1000);
        setLockTimer(remainingTime);
      } else {
        localStorage.removeItem("admin-locked-until");
      }
    }
    
    // Countdown timer for lock
    let interval: number | null = null;
    if (isLocked && lockTimer !== null) {
      interval = window.setInterval(() => {
        setLockTimer(prevTime => {
          if (prevTime !== null && prevTime > 1) {
            return prevTime - 1;
          } else {
            setIsLocked(false);
            localStorage.removeItem("admin-locked-until");
            return null;
          }
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLocked, lockTimer]);

  useEffect(() => {
    const authStatus = localStorage.getItem("admin-auth");
    const authTime = localStorage.getItem("admin-auth-time");
    
    if (authStatus === "true" && authTime) {
      // Check if the authentication is still valid (less than 15 minutes old)
      const now = new Date().getTime();
      const timeElapsed = now - parseInt(authTime);
      const fifteenMinutes = 15 * 60 * 1000;
      
      if (timeElapsed < fifteenMinutes) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem("admin-auth");
        localStorage.removeItem("admin-auth-time");
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Account locked",
        description: `Too many failed attempts. Please try again in ${lockTimer} seconds.`,
        variant: "destructive",
      });
      return;
    }
    
    if (password === "admin123") { // Simple demo password
      setIsAuthenticated(true);
      setLoginAttempts(0);
      const now = new Date().getTime();
      localStorage.setItem("admin-auth", "true");
      localStorage.setItem("admin-auth-time", now.toString());
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
    } else {
      // Failed login attempt
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        // Lock account for 1 minute after 5 failed attempts
        const lockUntil = new Date().getTime() + 60 * 1000; // 1 minute
        localStorage.setItem("admin-locked-until", lockUntil.toString());
        setIsLocked(true);
        setLockTimer(60); // 60 seconds
        
        toast({
          title: "Account locked",
          description: "Too many failed login attempts. Please try again in 1 minute.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: `Invalid password. ${5 - newAttempts} attempts remaining.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-auth-time");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-brand-DEFAULT text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-center">Admin Dashboard</h1>
          <p className="text-center mt-4 max-w-2xl mx-auto">
            Manage your product catalog
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto glass-effect p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-DEFAULT/10 flex items-center justify-center">
                <Lock className="text-brand-DEFAULT" size={24} />
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md pr-10"
                    placeholder="Enter admin password"
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full hover-scale" 
                disabled={isLocked}
              >
                {isLocked ? `Locked (${lockTimer}s)` : 'Login'}
              </Button>
            </form>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              For demo use password: admin123
            </div>
          </div>
        ) : (
          <div className="glass-effect rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Product Management</h2>
              <Button variant="outline" onClick={handleLogout} className="hover-lift">
                Logout
              </Button>
            </div>
            <ProductManagement />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;

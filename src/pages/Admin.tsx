
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductManagement from "@/components/admin/ProductManagement";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Simple authentication for demo purposes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Simple demo password
      setIsAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("admin-auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-auth");
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
          <div className="max-w-md mx-auto border rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              For demo use password: admin123
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Product Management</h2>
              <Button variant="outline" onClick={handleLogout}>
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

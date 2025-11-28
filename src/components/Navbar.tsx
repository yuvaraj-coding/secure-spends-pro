import { Shield, Menu, X, Sun, Moon, User, Settings, LogOut, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || "");
      if (session?.user) {
        loadProfilePicture(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || "");
      if (session?.user) {
        loadProfilePicture(session.user.id);
      } else {
        setProfilePicture("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfilePicture = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('profile_picture')
      .eq('user_id', userId)
      .single();
    
    if (data?.profile_picture) {
      setProfilePicture(data.profile_picture);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const publicNavItems = [
    { name: "Home", path: "/" },
  ];

  const authenticatedNavItems = [
    { name: "Home", path: "/" },
    { name: "AI Financial Coach", path: "/financial-coach" },
    { name: "Fraud Detector", path: "/fraud-detector" },
    { name: "Account Management", path: "/account-management" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transaction-history" },
    { name: "Learn & Earn", path: "/learn" },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FinWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-all duration-200",
                    isActive(item.path) && "bg-accent/10 text-accent font-medium"
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & User Profile */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={() => navigate("/app-scanner")}
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                App Scanner
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 px-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <AvatarImage src={profilePicture} alt={userEmail} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {getInitials(userEmail)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setShowAuthDialog(true)}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive(item.path) && "bg-accent/10 text-accent font-medium"
                    )}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/app-scanner");
                  }}
                  className="w-full justify-start bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>App Scanner</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start mt-2"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="ml-6">Toggle theme</span>
              </Button>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 mt-2 bg-accent/10 rounded-lg">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={profilePicture} alt={userEmail} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {getInitials(userEmail)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Account</p>
                      <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start mt-1"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/profile");
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowAuthDialog(true);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </nav>
  );
};

export default Navbar;

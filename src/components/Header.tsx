import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Heart, HelpCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileDrawer } from "./MobileNav";
import Ticker from "./Ticker";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Running Header Message / Ticker */}
      <Ticker />
      
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft safe-area-top">
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex h-14 md:h-16 items-center justify-between gap-2 md:gap-4">
            {/* Logo with Premium ॐ Symbol */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 md:space-x-3 transition-smooth hover:opacity-90 group flex-shrink-0"
            >
              <div className="relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary shadow-medium group-hover:shadow-strong transition-all duration-300 animate-glow">
                <span className="font-display text-xl md:text-2xl font-bold text-primary-foreground relative z-10 drop-shadow-sm">
                  ॐ
                </span>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/50 to-secondary/50 blur-sm opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg md:text-2xl font-bold text-gradient leading-tight">
                  DharmStays
                </span>
                <span className="text-[9px] md:text-[10px] text-muted-foreground font-medium -mt-0.5 hidden sm:block">
                  Sacred Stays
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium transition-smooth hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5",
                  isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className={cn(
                  "text-sm font-medium transition-smooth hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5",
                  isActive("/listings") ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                Explore Stays
              </Link>
            </nav>

            {/* Desktop Search Bar (Optional) */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 md:space-x-4 lg:space-x-6">
              <Button
                variant="gradient"
                size="lg"
                className="shadow-soft px-5 py-2 font-bold text-base rounded-xl gradient-primary text-primary-foreground mr-3"
                asChild
              >
                <Link to="#callme-modal">
                  <span>Call Me</span>
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="transition-smooth hover:bg-primary/10 rounded-lg h-9 w-9"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Customer Support</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="support@dharmstays.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input placeholder="+91 1800 123 4567" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <textarea className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Describe your issue..." />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost" 
                size="icon" 
                className="transition-smooth hover:bg-primary/10 rounded-lg h-9 w-9" 
                onClick={() => navigate("/user/dashboard")}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="transition-smooth hover:border-primary hover:text-primary hover:bg-primary/5 rounded-lg h-9 px-4 text-base font-semibold ml-2" 
                asChild
              >
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex-shrink-0">
              <MobileDrawer />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

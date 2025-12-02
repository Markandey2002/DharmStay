import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, Home, Search, Calendar, User, HelpCircle, LogOut, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="font-display text-xl font-bold text-primary-foreground">ॐ</span>
            </div>
            <span className="font-display text-xl font-bold text-gradient">DharmStay</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 space-y-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth",
              isActive("/") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/listings"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth",
              isActive("/listings") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Search className="h-5 w-5" />
            <span>Explore Stays</span>
          </Link>
          <button
            onClick={() => {
              navigate("/user/dashboard", { state: { activeTab: "bookings" } });
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-left",
              isActive("/user/dashboard") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Calendar className="h-5 w-5" />
            <span>My Bookings</span>
          </button>
          <button
            onClick={() => {
              navigate("/user/dashboard", { state: { activeTab: "profile" } });
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-left",
              isActive("/user/dashboard") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button 
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-left text-muted-foreground hover:bg-muted"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Support</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customer Support</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="support@dharmstay.com" disabled />
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
          <div className="pt-4 border-t border-border">
            <button 
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-left text-muted-foreground hover:bg-muted"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { id: "home", path: "/", icon: Home, label: "Home" },
    { id: "search", path: "/listings", icon: Search, label: "Search" },
    { id: "bookings", path: "/user/dashboard", icon: Calendar, label: "Bookings", tab: "bookings" },
    { id: "profile", path: "/user/dashboard", icon: User, label: "Profile", tab: "profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border md:hidden safe-area-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const handleClick = () => {
            if (item.tab) {
              // For dashboard items, navigate with state to open specific tab
              navigate(item.path, { state: { activeTab: item.tab } });
            } else {
              navigate(item.path);
            }
          };
          return (
            <button
              key={item.id}
              onClick={handleClick}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-smooth",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-primary")} />
              <span className={cn("text-xs", active && "font-medium")}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import HotelManagerDashboard from "./pages/HotelManagerDashboard";
import UserDashboard from "./pages/UserDashboard";
import FieldAgentDashboard from "./pages/FieldAgentDashboard";
import NotFound from "./pages/NotFound";
import { BottomNav } from "./components/MobileNav";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const hideBottomNav = ["/auth", "/admin/dashboard", "/hotel-manager/dashboard", "/agent/dashboard"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/hotel-manager/dashboard" element={<HotelManagerDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/agent/dashboard" element={<FieldAgentDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideBottomNav && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

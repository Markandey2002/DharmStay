import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import PropertyCard from "@/components/PropertyCard";
import CallMeModal from "@/components/CallMeModal";
import { properties } from "@/data/properties";
import heroImage from "@/assets/hero-temple.jpg";
import ramMandirBg from "@/assets/ram-mandir-bg.jpg";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Award, Phone } from "lucide-react";

const Index = () => {
  const featuredProperties = properties.slice(0, 4);
  const [callModalOpen, setCallModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Call Me Button - Fixed Position */}
      <Button
        onClick={() => setCallModalOpen(true)}
        size="lg"
        className="fixed top-24 right-6 z-50 gap-2 shadow-strong hover:shadow-medium transition-all animate-fade-in"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline">Call Me</span>
      </Button>

      <CallMeModal open={callModalOpen} onOpenChange={setCallModalOpen} />
      
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={ramMandirBg} 
            alt="Ram Mandir at Ayodhya during sunrise" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
          <div className="absolute inset-0 mandala-pattern" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center space-y-6 md:space-y-10 animate-fade-in-up py-8 md:py-20">
          <div className="space-y-4 md:space-y-8">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-gradient px-2 leading-tight md:leading-snug">
              Find Your Sacred Stay
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl md:max-w-3xl mx-auto px-2 font-light md:font-normal">
              Discover divine hospitality at DharmStay hotels, dharamshalas & homestays
            </p>
          </div>
          <div className="flex justify-center pt-2 px-0 md:px-2">
            <div className="w-full max-w-3xl md:max-w-4xl "><SearchBar variant="hero" /></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2 mb-6 md:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Explore Sacred Stays
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Choose from a variety of spiritual accommodations tailored to your journey
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <CategoryCard
              title="Hotels"
              description="Comfortable stays with modern amenities near temples"
              icon="🏨"
              color="bg-primary"
              link="/listings?type=hotel"
            />
            <CategoryCard
              title="Dharamshalas"
              description="Traditional guest houses for pilgrims"
              icon="🕉️"
              color="bg-secondary"
              link="/listings?type=dharamshala"
            />
            <CategoryCard
              title="Dormitories"
              description="Budget-friendly shared accommodations"
              icon="🛏️"
              color="bg-accent"
              link="/listings?type=dormitory"
            />
            <CategoryCard
              title="Homestays"
              description="Experience local culture and hospitality"
              icon="🏡"
              color="bg-spiritual-gold"
              link="/listings?type=homestay"
            />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-8 md:py-12 pb-20 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Properties
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Handpicked accommodations for your spiritual journey
              </p>
            </div>
            <Link to="/listings">
              <Button variant="outline" size="lg" className="hidden md:flex shadow-soft hover:shadow-medium transition-all">
                View All Properties
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/listings">
              <Button variant="outline" size="lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-muted/30 pb-20 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2 mb-6 md:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Why Choose DharmStay
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Your trusted companion for spiritual journeys
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center space-y-3 animate-fade-in p-4 rounded-xl hover:bg-card/50 transition-smooth">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shadow-soft">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold">Verified Stays</h3>
              <p className="text-sm text-muted-foreground">
                All properties thoroughly verified for authenticity and quality
              </p>
            </div>
            
            <div className="text-center space-y-3 animate-fade-in p-4 rounded-xl hover:bg-card/50 transition-smooth" style={{ animationDelay: "0.1s" }}>
              <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shadow-soft">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold">Best Prices</h3>
              <p className="text-sm text-muted-foreground">
                Transparent pricing with no hidden charges
              </p>
            </div>
            
            <div className="text-center space-y-3 animate-fade-in p-4 rounded-xl hover:bg-card/50 transition-smooth" style={{ animationDelay: "0.2s" }}>
              <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shadow-soft">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock assistance for your journey
              </p>
            </div>
            
            <div className="text-center space-y-3 animate-fade-in p-4 rounded-xl hover:bg-card/50 transition-smooth" style={{ animationDelay: "0.3s" }}>
              <div className="mx-auto w-14 h-14 rounded-full bg-spiritual-gold/10 flex items-center justify-center shadow-soft">
                <Award className="h-6 w-6 text-spiritual-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold">Trusted by Pilgrims</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands of satisfied travelers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border/40 py-8 md:py-10 pb-20 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <span className="font-display text-xl font-bold text-primary-foreground">ॐ</span>
                </div>
                <span className="font-display text-2xl font-bold text-gradient">DharmStay</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted companion for sacred journeys across India's holy destinations
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-smooth">Home</Link></li>
                <li><Link to="/listings" className="hover:text-primary transition-smooth">Explore Stays</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/listings?type=hotel" className="hover:text-primary transition-smooth">Hotels</Link></li>
                <li><Link to="/listings?type=dharamshala" className="hover:text-primary transition-smooth">Dharamshalas</Link></li>
                <li><Link to="/listings?type=dormitory" className="hover:text-primary transition-smooth">Dormitories</Link></li>
                <li><Link to="/listings?type=homestay" className="hover:text-primary transition-smooth">Homestays</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@dharmstay.com</li>
                <li>+91 1800 123 4567</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>© 2024 DharmStay. All rights reserved. Built with devotion 🙏</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

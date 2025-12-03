import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar as CalendarIcon, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
}

const SearchBar = ({ variant = "hero" }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");

  const handleSearch = () => {
    const params = new URLSearchParams({
      location: location || "",
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
      guests: guests,
    });
    navigate(`/listings?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full max-w-4xl">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Where do you want to go?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="gradient-primary hover:opacity-90 transition-smooth">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    );
  }

  // HERO VARIANT - Premium look
  return (
    <div className="w-full max-w-5xl bg-card rounded-3xl shadow-strong p-5 md:p-8 backdrop-blur-sm border border-border/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-6 items-center">
        {/* Location */}
        <div className="space-y-1">
          <label className="text-[15px] font-semibold text-foreground">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Varanasi, Rishikesh..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-12 h-14 text-base rounded-xl shadow-soft border border-border/60 focus:border-primary transition"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="space-y-1">
          <label className="text-[15px] font-semibold text-foreground">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 rounded-xl text-base justify-start text-left font-normal border-border/60",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {checkIn ? format(checkIn, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[50]" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-1">
          <label className="text-[15px] font-semibold text-foreground">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 rounded-xl text-base justify-start text-left font-normal border-border/60",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {checkOut ? format(checkOut, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[50]" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-1">
          <label className="text-[15px] font-semibold text-foreground">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="h-14 rounded-xl text-base border-border/60 shadow-soft">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Select guests" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8 md:mt-6 flex justify-end">
        <Button 
          onClick={handleSearch} 
          size="lg"
          className="gradient-primary hover:opacity-95 transition-smooth shadow-strong px-12 py-4 text-lg rounded-xl font-bold"
        >
          <Search className="mr-3 h-6 w-6" />
          Search Sacred Stays
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

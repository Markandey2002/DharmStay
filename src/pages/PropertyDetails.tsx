import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, Star, Users, Heart, Share2, Wifi, Wind, 
  Utensils, Coffee, Calendar as CalendarIcon, ChevronLeft, ChevronRight 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("Double");
  const [numberOfRooms, setNumberOfRooms] = useState("1");

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Property not found</h1>
          <Button onClick={() => navigate("/listings")}>Back to Listings</Button>
        </div>
      </div>
    );
  }

  const images = [
    property.image,
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const rooms = parseInt(numberOfRooms) || 1;
    // Get the price from the selected room type, not the base property price
    const selectedRoomType = roomTypes.find(rt => rt.type === roomType);
    const roomPrice = selectedRoomType?.price || property.price;
    const totalPrice = Math.round(roomPrice * nights * rooms);
    
    navigate("/checkout", {
      state: {
        property,
        checkIn,
        checkOut,
        guests,
        roomType,
        numberOfRooms: rooms,
        nights,
        totalPrice,
        roomPrice, // Also pass the room price for checkout display
      },
    });
  };

  const roomTypes = [
    { type: "Single", price: property.price * 0.8 },
    { type: "Double", price: property.price },
    { type: "Triple", price: property.price * 1.3 },
    { type: "Suite", price: property.price * 2 },
  ];

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    AC: Wind,
    Breakfast: Coffee,
    Restaurant: Utensils,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-8 pb-20 md:pb-8">
        {/* Image Gallery */}
        <div className="relative mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[21/9] bg-muted">
          <img
            src={images[currentImageIndex]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={prevImage}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 md:p-2.5 rounded-full transition-smooth hover:bg-background min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 md:p-2.5 rounded-full transition-smooth hover:bg-background min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-smooth",
                  idx === currentImageIndex ? "bg-primary w-8" : "bg-background/60"
                )}
              />
            ))}
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Property Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground">{property.type}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-muted-foreground ml-1">({property.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="font-display text-2xl md:text-4xl font-bold mb-3 md:mb-4">{property.name}</h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span>Up to {property.capacity} guests</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">About this property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Experience divine hospitality at {property.name}. Located in the heart of {property.location.split(",")[0]}, 
                  our property offers a perfect blend of spiritual serenity and modern comfort. Whether you're on a pilgrimage 
                  or seeking a peaceful retreat, we provide all the amenities needed for a memorable stay. Our dedicated staff 
                  ensures that your spiritual journey is complemented by warm hospitality and authentic experiences.
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                      <div key={amenity} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">Location</h2>
                <div className="relative rounded-lg overflow-hidden aspect-video bg-muted border border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 mx-auto text-primary/50" />
                      <p className="text-muted-foreground font-medium">{property.location}</p>
                      <p className="text-sm text-muted-foreground">Map view will be available here</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  This property is located in the heart of {property.location.split(",")[0]}, close to major temples and spiritual sites.
                </p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-border/50 pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">• 2 weeks ago</span>
                      </div>
                      <p className="text-muted-foreground">
                        Excellent stay! The peaceful atmosphere and proximity to the temple made our pilgrimage 
                        truly special. Highly recommended for spiritual seekers.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24 shadow-strong border-primary/20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold">₹{property.price}</span>
                  <span className="text-muted-foreground">/ night</span>
                </div>

                <div className="space-y-4">
                  {/* Check-in */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-in</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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

                  {/* Room Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Room Type</label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((rt) => (
                          <SelectItem key={rt.type} value={rt.type}>
                            {rt.type} - ₹{Math.round(rt.price)}/night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Rooms */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Rooms</label>
                    <Select value={numberOfRooms} onValueChange={setNumberOfRooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4">4 Rooms</SelectItem>
                        <SelectItem value="5">5+ Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guests</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
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

                {checkIn && checkOut && (
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="flex justify-between text-sm">
                      <span>Room price x {numberOfRooms} room(s) x {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                      <span>₹{Math.round((roomTypes.find(rt => rt.type === roomType)?.price || property.price) * parseInt(numberOfRooms) * Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span>₹{Math.round((roomTypes.find(rt => rt.type === roomType)?.price || property.price) * parseInt(numberOfRooms) * Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))}</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBooking}
                  size="lg" 
                  className="w-full gradient-primary hover:opacity-90 transition-smooth"
                >
                  Reserve Now
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

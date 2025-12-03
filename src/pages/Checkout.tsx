import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, MapPin, CreditCard, Building2, Wallet } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const MOCK_USER = {
  email: "user@email.com",
  phone: "+91 9876543210",
  name: "DharmGuest",
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  // Autofill using mock user (simulate logged-in user)
  const [contactName, setContactName] = useState(MOCK_USER.name);
  const [contactEmail, setContactEmail] = useState(MOCK_USER.email);
  const [contactPhone, setContactPhone] = useState(MOCK_USER.phone);
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">No booking data found</h1>
          <Button onClick={() => navigate("/listings")}>Back to Listings</Button>
        </div>
      </div>
    );
  }

  const { property, checkIn, checkOut, guests, roomType, numberOfRooms, nights, totalPrice, roomPrice } = bookingData;
  
  // Use roomPrice if available (from selected room type), otherwise fall back to property.price
  const displayPrice = roomPrice || property.price;
  
  const taxAmount = Math.round(totalPrice * 0.12);
  const serviceFee = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + taxAmount + serviceFee;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactName || !contactEmail || !contactPhone) {
      toast.error("Please fill in all contact details");
      return;
    }

    toast.success("Booking confirmed! You'll receive a confirmation email shortly.");
    setTimeout(() => {
      navigate("/user/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Confirm and pay</h1>
          <p className="text-muted-foreground">Complete your booking details to reserve your stay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/5 transition-smooth cursor-pointer">
                      <RadioGroupItem value="card" id="payment-card" />
                      <Label htmlFor="payment-card" className="cursor-pointer flex items-center gap-3 flex-1 font-normal">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Credit / Debit Card</div>
                          <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/5 transition-smooth cursor-pointer">
                      <RadioGroupItem value="upi" id="payment-upi" />
                      <Label htmlFor="payment-upi" className="cursor-pointer flex items-center gap-3 flex-1 font-normal">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">UPI Payment</div>
                          <div className="text-sm text-muted-foreground">Pay via Google Pay, PhonePe, Paytm</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/5 transition-smooth cursor-pointer">
                      <RadioGroupItem value="netbanking" id="payment-netbanking" />
                      <Label htmlFor="payment-netbanking" className="cursor-pointer flex items-center gap-3 flex-1 font-normal">
                        <Building2 className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Net Banking</div>
                          <div className="text-sm text-muted-foreground">Pay directly from your bank</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Terms */}
            <Card className="bg-muted/50 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By clicking "Confirm Booking", you agree to our terms and conditions. 
                  Cancellation policies apply as per the property's guidelines. You'll receive 
                  a confirmation email with booking details and payment receipt.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24 shadow-strong border-primary/20">
              <CardContent className="p-6 space-y-6">
                {/* Property Image */}
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property Info */}
                <div>
                  <h3 className="font-display text-xl font-semibold mb-1">{property.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                </div>

                <Separator />

                {/* Booking Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Booking Details</h4>
                  
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Check-in</div>
                      <div className="text-muted-foreground">{format(checkIn, "PPP")}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Check-out</div>
                      <div className="text-muted-foreground">{format(checkOut, "PPP")}</div>
                    </div>
                  </div>
                  
                  {roomType && (
                    <div className="flex items-start gap-3 text-sm">
                      <Building2 className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Room Type</div>
                        <div className="text-muted-foreground">{roomType} ({numberOfRooms || 1} {numberOfRooms === 1 ? "room" : "rooms"})</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 text-sm">
                    <Users className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Guests</div>
                      <div className="text-muted-foreground">{guests} {guests === "1" ? "Guest" : "Guests"}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Price Details</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>₹{displayPrice} × {numberOfRooms || 1} room(s) × {nights} {nights === 1 ? "night" : "nights"}</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>₹{serviceFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (12%)</span>
                      <span>₹{taxAmount}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  size="lg"
                  className="w-full gradient-primary hover:opacity-90 transition-smooth"
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
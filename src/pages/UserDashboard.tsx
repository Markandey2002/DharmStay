import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Heart, MapPin, Clock, Eye, X, User, Settings, HelpCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("bookings");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  // Handle navigation state from bottom nav
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleCancelBooking = (bookingId: number) => {
    if (!cancellationReason) {
      toast.error("Please provide a cancellation reason");
      return;
    }
    toast.success("Booking cancelled successfully. Refund will be processed within 5-7 business days.");
    setShowCancelDialog(false);
    setCancellationReason("");
  };

  const bookings = [
    { id: 1, name: "Sacred Haven Hotel", location: "Varanasi, Uttar Pradesh", checkIn: "Dec 15, 2024", checkOut: "Dec 18, 2024", status: "Confirmed", amount: 3600, roomType: "Double", rooms: 1 },
    { id: 2, name: "Divine Rest Dharamshala", location: "Haridwar, Uttarakhand", checkIn: "Dec 16, 2024", checkOut: "Dec 19, 2024", status: "Confirmed", amount: 2400, roomType: "Single", rooms: 2 },
    { id: 3, name: "Peaceful Dormitory", location: "Rishikesh, Uttarakhand", checkIn: "Dec 17, 2024", checkOut: "Dec 20, 2024", status: "Pending", amount: 900, roomType: "Dormitory", rooms: 1 },
  ];

  const pastBookings = [
    { id: 4, name: "Temple View Hotel", location: "Tirupati, Andhra Pradesh", checkIn: "Nov 10, 2024", checkOut: "Nov 13, 2024", status: "Completed", amount: 6000 },
    { id: 5, name: "Spiritual Haven", location: "Amritsar, Punjab", checkIn: "Oct 5, 2024", checkOut: "Oct 8, 2024", status: "Completed", amount: 1800 },
  ];

  const savedProperties = [
    { id: "2", name: "Divine Rest Dharamshala", location: "Haridwar", price: "₹800/night", rating: 4.7 },
    { id: "4", name: "Holy Homestay", location: "Ayodhya", price: "₹1,200/night", rating: 4.9 },
    { id: "5", name: "Temple View Hotel", location: "Vrindavan", price: "₹1,500/night", rating: 4.6 },
    { id: "3", name: "Ganga Side Dormitory", location: "Rishikesh", price: "₹400/night", rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Header Section */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-1">My Dashboard</h1>
            <p className="text-base text-muted-foreground">Manage your bookings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 shadow-soft">
                  <HelpCircle className="h-4 w-4" />
                  Support
                </Button>
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
            <Button variant="outline" onClick={() => navigate("/")} className="shadow-soft">
              Back to Home
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{bookings.length}</div>
              <p className="text-xs text-primary font-medium mt-1">Upcoming stays</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Past Bookings</CardTitle>
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pastBookings.length}</div>
              <p className="text-xs text-secondary font-medium mt-1">Completed stays</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saved Properties</CardTitle>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{savedProperties.length}</div>
              <p className="text-xs text-accent font-medium mt-1">Favorites</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="saved">Saved Properties</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">{booking.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {booking.location}
                          </p>
                          {booking.roomType && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {booking.roomType} • {booking.rooms} {booking.rooms === 1 ? "room" : "rooms"}
                            </p>
                          )}
                        </div>
                        <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3 bg-muted/30 rounded-lg p-3">
                        <div>
                          <p className="text-muted-foreground text-xs">Check-in</p>
                          <p className="font-medium mt-1">{booking.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Check-out</p>
                          <p className="font-medium mt-1">{booking.checkOut}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-primary">₹{booking.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => navigate("/listings")}>
                          <Eye className="h-3 w-3" />
                          View Details
                        </Button>
                        {booking.status === "Confirmed" && (
                          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive">
                                <X className="h-3 w-3" />
                                Cancel
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Cancel Booking</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                  Are you sure you want to cancel this booking? Refund will be processed according to cancellation policy.
                                </p>
                                <div className="space-y-2">
                                  <Label>Reason for cancellation</Label>
                                  <textarea
                                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Please provide a reason..."
                                    value={cancellationReason}
                                    onChange={(e) => setCancellationReason(e.target.value)}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1" onClick={() => setShowCancelDialog(false)}>
                                    Keep Booking
                                  </Button>
                                  <Button className="flex-1" onClick={() => handleCancelBooking(booking.id)}>
                                    Confirm Cancellation
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{booking.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {booking.location}
                          </p>
                        </div>
                        <Badge variant="secondary">{booking.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3 bg-muted/30 rounded-lg p-3">
                        <div>
                          <p className="text-muted-foreground text-xs">Check-in</p>
                          <p className="font-medium mt-1">{booking.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Check-out</p>
                          <p className="font-medium mt-1">{booking.checkOut}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-primary">₹{booking.amount}</p>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => navigate("/listings")}>
                          <Eye className="h-3 w-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Properties Tab */}
          <TabsContent value="saved" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{property.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {property.location}
                          </p>
                          <p className="text-sm font-medium text-primary mt-1">{property.price}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-destructive/10">
                          <Heart className="h-4 w-4 fill-accent text-accent" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/property/${property.id}`)}>
                        Book Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Rajesh Kumar" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="rajesh@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="123 Main Street, City, State" />
                </div>
                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

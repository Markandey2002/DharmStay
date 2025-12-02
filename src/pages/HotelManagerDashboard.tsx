import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, Calendar, DollarSign, Star, Plus, Edit, Eye, MapPin, 
  Upload, Settings, Users, Bed, Wifi, Wind, Coffee, Utensils 
} from "lucide-react";
import { toast } from "sonner";

export default function HotelManagerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const [properties] = useState([
    { id: 1, name: "Sacred Haven Hotel", location: "Varanasi", rooms: 24, rating: 4.8, reviews: 45, status: "Active", price: 1200 },
    { id: 2, name: "Divine Rest Dharamshala", location: "Haridwar", rooms: 18, rating: 4.6, reviews: 32, status: "Active", price: 800 },
  ]);

  const [bookings] = useState([
    { id: 1, guest: "Rajesh Kumar", checkIn: "Dec 15, 2024", checkOut: "Dec 18, 2024", property: "Sacred Haven Hotel", status: "Confirmed", amount: 3600 },
    { id: 2, guest: "Priya Sharma", checkIn: "Dec 16, 2024", checkOut: "Dec 19, 2024", property: "Divine Rest Dharamshala", status: "Confirmed", amount: 2400 },
  ]);

  const [rooms] = useState([
    { id: 1, type: "Double", price: 1200, available: 8, total: 10 },
    { id: 2, type: "Single", price: 800, available: 5, total: 6 },
    { id: 3, type: "Triple", price: 1500, available: 3, total: 4 },
  ]);

  const totalEarnings = 240000;
  const monthlyEarnings = 48000;
  const totalBookings = 47;

  const handleEditRoom = (roomId: number) => {
    toast.info("Room editing feature - open edit dialog");
  };

  const handleUpdateAvailability = (roomId: number) => {
    toast.success("Availability updated successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Header Section */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-1">Property Manager</h1>
            <p className="text-base text-muted-foreground">Manage your properties and bookings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")} className="shadow-soft">
              Back to Home
            </Button>
            <Button size="lg" className="gap-2 shadow-medium hover:shadow-strong transition-all">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Properties</CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{properties.length}</div>
              <p className="text-xs text-primary font-medium mt-1">Active listings</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bookings This Month</CardTitle>
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalBookings}</div>
              <p className="text-xs text-secondary font-medium mt-1">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹{monthlyEarnings.toLocaleString()}</div>
              <p className="text-xs text-accent font-medium mt-1">+20% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-spiritual-gold">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <div className="h-10 w-10 rounded-full bg-spiritual-gold/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-spiritual-gold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.8</div>
              <p className="text-xs text-spiritual-gold font-medium mt-1">Based on 234 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>My Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {properties.slice(0, 2).map((property) => (
                      <div key={property.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{property.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {property.location} • {property.rooms} rooms
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-spiritual-gold text-spiritual-gold" />
                                <span className="text-sm font-medium">{property.rating}</span>
                              </div>
                              <Badge variant="default" className="text-xs">{property.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => setActiveTab("properties")}>
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => navigate(`/property/${property.id}`)}>
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{booking.guest}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {booking.property}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.checkIn} - {booking.checkOut}
                            </p>
                            <p className="text-sm font-medium text-primary mt-1">₹{booking.amount}</p>
                          </div>
                          <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  All Properties
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">{property.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {property.location} • {property.rooms} rooms
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-spiritual-gold text-spiritual-gold" />
                              <span className="text-sm font-medium">{property.rating}</span>
                              <span className="text-xs text-muted-foreground">({property.reviews} reviews)</span>
                            </div>
                            <Badge variant={property.status === "Active" ? "default" : "secondary"} className="text-xs">
                              {property.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => navigate(`/property/${property.id}`)}>
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Upload className="h-3 w-3" />
                              Images
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Property Images</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                <Input type="file" multiple accept="image/*" className="mt-4" />
                              </div>
                              <Button className="w-full">Upload Images</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Room Management
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Room
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bed className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold text-foreground">{room.type} Room</h3>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Price per night</p>
                              <p className="font-semibold text-foreground">₹{room.price}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Available</p>
                              <p className="font-semibold text-foreground">{room.available}/{room.total}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Status</p>
                              <Badge variant={room.available > 0 ? "default" : "secondary"} className="text-xs">
                                {room.available > 0 ? "Available" : "Full"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 gap-1">
                              <Edit className="h-3 w-3" />
                              Edit Price
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Room Price</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Room Type</Label>
                                <Input value={room.type} disabled />
                              </div>
                              <div className="space-y-2">
                                <Label>Price per Night (₹)</Label>
                                <Input type="number" defaultValue={room.price} />
                              </div>
                              <div className="space-y-2">
                                <Label>Available Rooms</Label>
                                <Input type="number" defaultValue={room.available} min="0" max={room.total} />
                              </div>
                              <Button className="w-full">Update Room</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleUpdateAvailability(room.id)}>
                          <Settings className="h-3 w-3" />
                          Availability
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{booking.guest}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {booking.property}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Check-in</p>
                              <p className="font-medium">{booking.checkIn}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Check-out</p>
                              <p className="font-medium">{booking.checkOut}</p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-primary mt-2">₹{booking.amount}</p>
                        </div>
                        <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Property Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Update Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["WiFi", "AC", "Breakfast", "Restaurant", "Parking", "Temple View"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2 border rounded-lg p-3">
                        <Checkbox defaultChecked />
                        <Label className="font-normal">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                  <Button>Update Amenities</Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="font-semibold">Total Earnings</h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">₹{totalEarnings.toLocaleString()}</span>
                      <span className="text-muted-foreground">Total revenue</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">All time earnings from bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

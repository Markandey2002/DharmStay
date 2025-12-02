import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Upload, MapPin, Plus, X, Bed } from "lucide-react";
import { toast } from "sonner";

interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
  available: number;
}

const Auth = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    propertyName: "",
    propertyLocation: "",
    propertyAddress: "",
    rooms: [] as Room[],
    amenities: [] as string[],
    images: [] as File[],
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const propertyTypes = ["Hotel", "Dharamshala", "Dormitory", "Homestay"];
  const roomTypeOptions = ["Single", "Double", "Triple", "Quad", "Dormitory", "Suite"];
  const amenityOptions = [
    "WiFi", "AC", "Breakfast", "Restaurant", "Parking", "Temple View", 
    "Hot Water", "Laundry", "Room Service", "Gym", "Swimming Pool", "Garden"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful!");
    navigate("/user/dashboard");
  };

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAddRoom = useCallback(() => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      type: "Double",
      price: 1000,
      capacity: 2,
      available: 1,
    };
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, newRoom]
    }));
    toast.success("Room added");
  }, []);

  const handleUpdateRoom = useCallback((roomId: string, field: keyof Room, value: any) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room =>
        room.id === roomId ? { ...room, [field]: value } : room
      )
    }));
  }, []);

  const handleRemoveRoom = useCallback((roomId: string) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter(room => room.id !== roomId)
    }));
    toast.success("Room removed");
  }, []);

  const handleAmenityToggle = useCallback((amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
      toast.success(`${files.length} image(s) added`);
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }, []);

  const nextStep = useCallback(() => {
    // Validation
    if (currentStep === 1 && (!formData.fullName || !formData.phone || !formData.email)) {
      toast.error("Please fill in all personal information fields");
      return;
    }
    if (currentStep === 2 && (!formData.propertyType || !formData.propertyName)) {
      toast.error("Please fill in property type and name");
      return;
    }
    if (currentStep === 3 && (!formData.propertyLocation || !formData.propertyAddress)) {
      toast.error("Please fill in property location and address");
      return;
    }
    if (currentStep === 5 && formData.rooms.length === 0) {
      toast.error("Please add at least one room");
      return;
    }
    if (currentStep === 6 && formData.amenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, formData, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration data:", formData);
    toast.success("Property registration submitted successfully! We'll review and get back to you soon.");
    setTimeout(() => {
      navigate("/hotel-manager/dashboard");
    }, 2000);
  }, [formData, navigate]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyName">Property Name *</Label>
              <Input
                id="propertyName"
                type="text"
                placeholder="Enter your property name"
                value={formData.propertyName}
                onChange={(e) => handleInputChange("propertyName", e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propertyLocation">City, State *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="propertyLocation"
                  type="text"
                  placeholder="Varanasi, Uttar Pradesh"
                  value={formData.propertyLocation}
                  onChange={(e) => handleInputChange("propertyLocation", e.target.value)}
                  className="pl-10 w-full"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Full Address *</Label>
              <textarea
                id="propertyAddress"
                placeholder="Street address, landmark, etc."
                value={formData.propertyAddress}
                onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="relative rounded-lg overflow-hidden aspect-video bg-muted border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 mx-auto text-primary/50" />
                  <p className="text-sm text-muted-foreground">Map view will be available here</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Property Images</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG up to 10MB each
                </p>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">
                    {formData.images.length} image(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((img, idx) => (
                      <Badge key={idx} variant="secondary" className="gap-1 pr-1">
                        <span className="text-xs truncate max-w-[120px]">{img.name}</span>
                        <button
                          onClick={() => removeImage(idx)}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Add Rooms</Label>
              <Button type="button" onClick={handleAddRoom} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Room
              </Button>
            </div>
            
            {formData.rooms.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border rounded-lg">
                <Bed className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">No rooms added yet</p>
                <Button type="button" onClick={handleAddRoom} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Room
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.rooms.map((room, index) => (
                  <Card key={room.id} className="border-border">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Room {index + 1}</h4>
                        {formData.rooms.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRoom(room.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Room Type *</Label>
                          <Select
                            value={room.type}
                            onValueChange={(value) => handleUpdateRoom(room.id, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roomTypeOptions.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Price per Night (₹) *</Label>
                          <Input
                            type="number"
                            value={room.price}
                            onChange={(e) => handleUpdateRoom(room.id, "price", parseInt(e.target.value) || 0)}
                            min="0"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Capacity (Guests) *</Label>
                          <Input
                            type="number"
                            value={room.capacity}
                            onChange={(e) => handleUpdateRoom(room.id, "capacity", parseInt(e.target.value) || 1)}
                            min="1"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Available Rooms *</Label>
                          <Input
                            type="number"
                            value={room.available}
                            onChange={(e) => handleUpdateRoom(room.id, "available", parseInt(e.target.value) || 0)}
                            min="0"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Amenities *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenityOptions.map(amenity => (
                <div
                  key={amenity}
                  className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-smooth ${
                    formData.amenities.includes(amenity)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleAmenityToggle(amenity)}
                >
                  <Checkbox
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <Label className="cursor-pointer font-normal text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-lg">Review Your Registration</h3>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {formData.fullName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {formData.phone}
                </div>
                <div>
                  <span className="font-medium">Property:</span> {formData.propertyName} ({formData.propertyType})
                </div>
                <div>
                  <span className="font-medium">Location:</span> {formData.propertyLocation}
                </div>
                <div>
                  <span className="font-medium">Rooms:</span> {formData.rooms.length}
                </div>
                <div>
                  <span className="font-medium">Amenities:</span> {formData.amenities.length} selected
                </div>
                <div>
                  <span className="font-medium">Images:</span> {formData.images.length} uploaded
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Please review all information before submitting. You can go back to make changes.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = [
      "Personal Information",
      "Property Details",
      "Property Location",
      "Property Images",
      "Add Rooms",
      "Amenities",
      "Review & Submit"
    ];
    return titles[currentStep - 1] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="font-display text-xl font-bold text-primary-foreground">ॐ</span>
            </div>
            <span className="text-xl md:text-2xl font-display font-bold text-gradient">DharmStay</span>
          </Link>
        </div>
      </header>

      {/* Auth Form */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">Welcome</h1>
            <p className="text-sm md:text-base text-muted-foreground">Sign in or register your property</p>
          </div>

          <Card className="border-border/50 shadow-strong">
            <CardHeader className="pb-4">
              <CardTitle className="text-center font-display text-xl md:text-2xl">Join DharmStay</CardTitle>
              <CardDescription className="text-center text-sm">
                Book peaceful stays at temples, dharamshalas, and spiritual retreats
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">Register Property</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-muted-foreground">Remember me</span>
                      </label>
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                {/* Registration Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="font-medium">Step {currentStep} of {totalSteps}</span>
                        <span className="text-muted-foreground text-xs">{getStepTitle()}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[250px] md:min-h-[300px]">
                      {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-border gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="gap-2 flex-1 md:flex-initial"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back</span>
                      </Button>
                      
                      {currentStep < totalSteps ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="gap-2 flex-1 md:flex-initial"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="gap-2 flex-1 md:flex-initial gradient-primary hover:opacity-90 transition-smooth"
                        >
                          Submit Registration
                        </Button>
                      )}
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:mt-6">
            Protected by reCAPTCHA and subject to Google's Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Upload, 
  Camera, 
  FileText, 
  Navigation, 
  Phone, 
  User,
  ClipboardCheck,
  Eye,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FieldAgentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with Agent Profile */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">Field Agent Dashboard</h1>
            <p className="text-lg text-muted-foreground">Property verification and on-ground tasks</p>
          </div>
          
          {/* Agent Profile Card */}
          <Card className="w-full md:w-auto shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Agent ID: AG-2024-123</p>
                  <p className="text-sm text-muted-foreground">Assigned Area: Varanasi</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-accent">
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Assigned</CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">24</div>
              <p className="text-xs text-primary font-medium mt-1">Properties</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-spiritual-gold">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <div className="h-10 w-10 rounded-full bg-spiritual-gold/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-spiritual-gold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">18</div>
              <p className="text-xs text-spiritual-gold font-medium mt-1">Verified tasks</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">6</div>
              <p className="text-xs text-accent font-medium mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Visits</CardTitle>
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">4</div>
              <p className="text-xs text-secondary font-medium mt-1">Scheduled</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft hover:shadow-medium transition-all mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="h-4 w-4 text-primary" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="gap-2 shadow-soft hover:shadow-medium transition-all">
                <Camera className="h-4 w-4" />
                Upload Photo
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-muted transition-all">
                <FileText className="h-4 w-4" />
                Add Notes
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-muted transition-all">
                <CheckCircle2 className="h-4 w-4" />
                Mark Complete
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-muted transition-all">
                <Navigation className="h-4 w-4" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Properties List */}
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Assigned Properties
                <Button variant="outline" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    name: "Sacred Haven Hotel", 
                    location: "Varanasi, UP", 
                    owner: "Rajesh Kumar",
                    status: "Pending",
                    priority: "High"
                  },
                  { 
                    name: "Divine Rest Dharamshala", 
                    location: "Haridwar, UK", 
                    owner: "Priya Sharma",
                    status: "In Review",
                    priority: "Medium"
                  },
                  { 
                    name: "Peaceful Dormitory", 
                    location: "Rishikesh, UK", 
                    owner: "Amit Patel",
                    status: "Verified",
                    priority: "Low"
                  },
                  { 
                    name: "Holy Homestay", 
                    location: "Ayodhya, UP", 
                    owner: "Sneha Gupta",
                    status: "Requires Revisit",
                    priority: "High"
                  },
                ].map((property, i) => (
                  <div key={i} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">{property.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Owner: {property.owner}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge 
                          variant={
                            property.status === "Verified" ? "default" : 
                            property.status === "Pending" ? "secondary" : 
                            "outline"
                          }
                        >
                          {property.status}
                        </Badge>
                        <Badge variant="outline" className={
                          property.priority === "High" ? "border-accent text-accent" :
                          property.priority === "Medium" ? "border-secondary text-secondary" :
                          "border-muted-foreground text-muted-foreground"
                        }>
                          {property.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Eye className="h-3 w-3" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Module */}
          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload & Verify
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-all cursor-pointer">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Upload Property Photos</p>
                    <p className="text-xs text-muted-foreground mt-1">Click or drag to upload</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-all cursor-pointer">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Upload Documents</p>
                    <p className="text-xs text-muted-foreground mt-1">License, certificates, etc.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Verification Notes</label>
                    <textarea 
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Add verification notes, observations, or remarks..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button className="gap-1" size="sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Verify
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Clock className="h-4 w-4" />
                      Revisit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Today's Route
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg h-[200px] flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Map view placeholder</p>
                    <p className="text-xs text-muted-foreground mt-1">4 properties on route</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Navigation className="h-4 w-4" />
                  Start Navigation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation to other dashboards */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">Back to Home</Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">Admin Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
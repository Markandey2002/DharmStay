import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, BookCheck, TrendingUp, Settings, Plus, Eye, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage properties, users, and bookings</p>
          </div>
          <Button size="lg" className="gap-2 shadow-medium hover:shadow-strong transition-all">
            <Settings className="h-5 w-5" />
            System Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">248</div>
              <p className="text-xs text-primary font-medium mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">1,842</div>
              <p className="text-xs text-secondary font-medium mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <BookCheck className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">342</div>
              <p className="text-xs text-accent font-medium mt-1">+7% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-spiritual-gold">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <div className="h-10 w-10 rounded-full bg-spiritual-gold/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-spiritual-gold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">₹12.8L</div>
              <p className="text-xs text-spiritual-gold font-medium mt-1">+22% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Properties
                <Button variant="outline" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sacred Haven Hotel", location: "Varanasi", category: "Hotel", status: "Active" },
                  { name: "Divine Rest Dharamshala", location: "Haridwar", category: "Dharamshala", status: "Pending" },
                  { name: "Peaceful Dormitory", location: "Rishikesh", category: "Dormitory", status: "Active" },
                  { name: "Holy Homestay", location: "Ayodhya", category: "Homestay", status: "Active" },
                ].map((property, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 py-2 rounded-lg transition-all">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{property.name}</p>
                      <p className="text-sm text-muted-foreground">{property.location} • {property.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                        {property.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Users
                <Button variant="outline" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rajesh Kumar", email: "rajesh@example.com", role: "User", date: "2 days ago" },
                  { name: "Priya Sharma", email: "priya@example.com", role: "Hotel Manager", date: "3 days ago" },
                  { name: "Amit Patel", email: "amit@example.com", role: "User", date: "5 days ago" },
                  { name: "Sneha Gupta", email: "sneha@example.com", role: "Agent", date: "1 week ago" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 py-2 rounded-lg transition-all">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{user.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{user.role}</Badge>
                      <Button variant="outline" size="sm" className="gap-1">
                        <UserCog className="h-3 w-3" />
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft hover:shadow-medium transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="gap-2 shadow-soft hover:shadow-medium transition-all">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-muted transition-all">
                <Building2 className="h-4 w-4" />
                Manage Categories
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-muted transition-all">
                <TrendingUp className="h-4 w-4" />
                View Reports
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-muted transition-all">
                <Users className="h-4 w-4" />
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation to other dashboards */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2">
            <Link to="/hotel-manager/dashboard">
              <Button variant="ghost" size="sm">Hotel Manager Dashboard</Button>
            </Link>
            <Link to="/user/dashboard">
              <Button variant="ghost" size="sm">User Dashboard</Button>
            </Link>
            <Link to="/agent/dashboard">
              <Button variant="ghost" size="sm">Field Agent Dashboard</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
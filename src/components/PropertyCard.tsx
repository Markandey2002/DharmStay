import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  capacity: number;
  amenities: string[];
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-medium border-border/50 hover:border-primary/50">
      <Link to={`/property/${property.id}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">
              {property.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-smooth"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      
      <CardContent className="p-4 space-y-3">
        <Link to={`/property/${property.id}`}>
          <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-smooth">
            {property.name}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews})</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{property.capacity} guests</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="font-display text-2xl font-bold text-foreground">₹{property.price}</span>
            <span className="text-sm text-muted-foreground ml-1">/ night</span>
          </div>
          <Link to={`/property/${property.id}`}>
            <Button size="sm" className="gradient-primary hover:opacity-90 transition-smooth">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

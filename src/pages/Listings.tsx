import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Listings = () => {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(typeFilter ? [typeFilter] : []);
  const [minRating, setMinRating] = useState(0);

  const propertyTypes = ["Hotel", "Dharamshala", "Dormitory", "Homestay"];

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type);
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesRating = property.rating >= minRating;
      
      return matchesType && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [selectedTypes, priceRange, minRating, sortBy]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setPriceRange([0, 3000]);
    setMinRating(0);
    setSortBy("recommended");
  };

  const hasActiveFilters = selectedTypes.length > 0 || priceRange[0] > 0 || priceRange[1] < 3000 || minRating > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Property Type</h3>
        <div className="space-y-3">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <label htmlFor={type} className="text-sm cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={3000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Minimum Rating</h3>
        <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any Rating</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Bar Section */}
      <section className="bg-muted/30 py-8 border-b border-border/40">
        <div className="container mx-auto px-4">
          <SearchBar variant="compact" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8 pb-20 md:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-xl p-6 border border-border/50 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">Filters</h2>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">
                  {typeFilter ? `${typeFilter}s` : "All Properties"}
                </h1>
                <p className="text-muted-foreground">
                  {filteredAndSortedProperties.length} properties found
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden flex-1 sm:flex-initial">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                          !
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="font-display text-2xl">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredAndSortedProperties.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  No properties found matching your filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;

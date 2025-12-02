import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

const CategoryCard = ({ title, description, icon, color, link }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <div className="group relative overflow-hidden rounded-xl bg-card border border-border/50 p-6 transition-smooth hover:shadow-medium hover:border-primary/50 cursor-pointer">
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-smooth group-hover:opacity-30",
          color
        )} />
        
        <div className="relative z-10">
          <div className="text-5xl mb-4 transform transition-smooth group-hover:scale-110">
            {icon}
          </div>
          <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-smooth">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="text-primary">→</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

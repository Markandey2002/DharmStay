const spiritualQuotes = [
  "Find peace in every journey 🌼",
  "Stay blessed, stay comfortable — DharmStays ✨",
  "Explore sacred destinations with comfort & devotion 🕉️",
  "Your spiritual journey begins with the right stay 🙏",
  "Experience divine hospitality across India's holy lands 🏛️",
  "Where faith meets comfort — DharmStays 🌸",
];

const Ticker = () => {
  // Duplicate quotes for seamless loop
  const duplicatedQuotes = [...spiritualQuotes, ...spiritualQuotes];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-primary/20">
      <div className="flex items-center py-2 md:py-2.5">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {duplicatedQuotes.map((quote, index) => (
            <span
              key={index}
              className="inline-block mx-6 md:mx-8 text-xs md:text-sm font-medium text-foreground/90 flex-shrink-0"
            >
              {quote}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticker;



import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Watchable } from "@/data/watchables";
import { Tv2, Star, CalendarDays } from "lucide-react"; // Using Tv2 as default, Star for rating, CalendarDays for year

interface WatchableCardProps {
  item: Watchable;
}

// Helper function to strip HTML tags from summary
const stripHtml = (html: string | undefined): string => {
  if (!html) return "No description available.";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "No description available.";
};

// Helper function to extract year from premiered date
const getYearFromDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).getFullYear().toString() || "N/A";
};

const WatchableCard: React.FC<WatchableCardProps> = ({ item }) => {
  const imageUrl = item.image?.medium || item.image?.original || "https://via.placeholder.com/800x450.png?text=No+Image";
  const year = getYearFromDate(item.premiered);
  const cleanSummary = stripHtml(item.summary);

  return (
    <Card className="w-full max-w-md bg-slate-800 border-slate-700 text-gray-200 shadow-xl transform transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0 relative">
        <img 
          src={imageUrl} 
          alt={item.name} 
          className="rounded-t-lg w-full h-72 object-cover" // Increased height
        />
        {item.rating?.average && (
          <Badge className="absolute top-2 right-2 bg-amber-500/80 text-white border-amber-500/30 backdrop-blur-sm">
            <Star className="h-3 w-3 mr-1" /> {item.rating.average}/10
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold mb-2 text-white">{item.name}</CardTitle>
        <div className="flex items-center flex-wrap gap-2 mb-3">
          {/* TVMaze items have a 'type' like "Scripted", "Animation". We display it. */}
          <Badge variant="secondary" className="bg-sky-500/20 text-sky-300 border-sky-500/30 flex items-center">
            <Tv2 className="h-4 w-4 mr-1 text-sky-400" /> {item.type || 'TV Show'}
          </Badge>
          {item.genres?.slice(0, 2).map(genre => ( // Show up to 2 genres
             <Badge key={genre} variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">{genre}</Badge>
          ))}
          <Badge variant="outline" className="bg-gray-500/20 text-gray-300 border-gray-500/30 flex items-center">
            <CalendarDays className="h-4 w-4 mr-1 text-gray-400" /> {year}
          </Badge>
        </div>
        {/* Using a div that can scroll if description is too long */}
        <div className="max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
          <CardDescription className="text-gray-300 leading-relaxed">{cleanSummary}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-2 flex justify-between items-center">
         {/* Can add actions here later, e.g., link to item.url if available */}
         {item.url && (
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-teal-400 hover:text-teal-300 hover:underline text-sm"
            >
              More Info on TVMaze
            </a>
         )}
      </CardFooter>
    </Card>
  );
};

export default WatchableCard;


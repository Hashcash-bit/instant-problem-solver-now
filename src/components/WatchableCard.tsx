
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Watchable } from "@/data/watchables";
import { Film, Tv2 } from "lucide-react";

interface WatchableCardProps {
  item: Watchable;
}

const WatchableCard: React.FC<WatchableCardProps> = ({ item }) => {
  const imageUrl = `https://images.unsplash.com/${item.imageKey}?w=800&h=450&fit=crop&q=80`;

  return (
    <Card className="w-full max-w-md bg-slate-800 border-slate-700 text-gray-200 shadow-xl transform transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <img 
          src={imageUrl} 
          alt={item.title} 
          className="rounded-t-lg w-full h-60 object-cover" 
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold mb-2 text-white">{item.title}</CardTitle>
        <div className="flex items-center space-x-2 mb-3">
          {item.type === "Movie" ? <Film className="h-5 w-5 text-sky-400" /> : <Tv2 className="h-5 w-5 text-emerald-400" />}
          <Badge variant="secondary" className="bg-sky-500/20 text-sky-300 border-sky-500/30">{item.type}</Badge>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">{item.genre}</Badge>
          <span className="text-sm text-gray-400">{item.year}</span>
        </div>
        <CardDescription className="text-gray-300 leading-relaxed">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {/* Can add actions here later, e.g., "Watch Trailer" */}
      </CardFooter>
    </Card>
  );
};

export default WatchableCard;

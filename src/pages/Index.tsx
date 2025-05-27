import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import WatchableCard from "@/components/WatchableCard";
import { Watchable, genres_hardcoded_fallback, types_hardcoded_fallback } from "@/data/watchables"; // Watchable interface, fallback genres/types
import { Shuffle, Film, Tv2, ListFilter, AlertTriangle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast"; // Or sonner if preferred

const INTERNAL_ANY_GENRE_VALUE = "__internal_any_genre_placeholder__";
const INTERNAL_ANY_TYPE_VALUE = "__internal_any_type_placeholder__";

const fetchWatchables = async (): Promise<Watchable[]> => {
  // Fetching first page of shows from TVMaze
  const response = await fetch('https://api.tvmaze.com/shows?page=0');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // Transform data if necessary, here we assume it mostly matches our updated Watchable interface
  // For example, TVMaze uses 'name' for title, 'genres' as array, 'summary' for description.
  // The Watchable interface is already updated to reflect this.
  return data.slice(0, 100); // Let's take first 100 shows for performance
};

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [recommendation, setRecommendation] = useState<Watchable | null>(null);
  
  const { data: watchables, isLoading: isLoadingWatchables, error: fetchError } = useQuery<Watchable[], Error>({
    queryKey: ['watchables'],
    queryFn: fetchWatchables,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const [isFindingRecommendation, setIsFindingRecommendation] = useState<boolean>(false);

  useEffect(() => {
    if (fetchError) {
      toast({
        title: "Error fetching data",
        description: `Could not load shows: ${fetchError.message}. Using fallback data.`,
        variant: "destructive",
      });
      console.error("Error fetching watchables:", fetchError);
    }
  }, [fetchError]);

  const allFetchedGenres = useMemo(() => {
    if (!watchables) return genres_hardcoded_fallback;
    const genresSet = new Set<string>();
    watchables.forEach(w => w.genres?.forEach(g => genresSet.add(g)));
    const sortedGenres = Array.from(genresSet).sort();
    return sortedGenres.length > 0 ? sortedGenres : genres_hardcoded_fallback;
  }, [watchables]);

  const allFetchedTypes = useMemo(() => {
    if (!watchables) return types_hardcoded_fallback;
    const typesSet = new Set<string>();
    watchables.forEach(w => { if (w.type) typesSet.add(w.type) });
    const sortedTypes = Array.from(typesSet).sort();
    return sortedTypes.length > 0 ? sortedTypes : types_hardcoded_fallback;
  }, [watchables]);


  const availableGenres = useMemo(() => {
    if (!watchables) return genres_hardcoded_fallback;
    if (selectedType) {
      const filtered = watchables.filter(w => w.type === selectedType);
      const genresSet = new Set<string>();
      filtered.forEach(w => w.genres?.forEach(g => genresSet.add(g)));
      return Array.from(genresSet).sort();
    }
    return allFetchedGenres;
  }, [selectedType, watchables, allFetchedGenres]);

  const availableTypes = useMemo(() => {
    if (!watchables) return types_hardcoded_fallback;
    if (selectedGenre) {
      const filtered = watchables.filter(w => w.genres?.includes(selectedGenre));
      const typesSet = new Set<string>();
      filtered.forEach(w => { if (w.type) typesSet.add(w.type) });
      return Array.from(typesSet).sort();
    }
    return allFetchedTypes;
  }, [selectedGenre, watchables, allFetchedTypes]);

  const handleFindRecommendation = () => {
    if (!watchables || watchables.length === 0) {
      toast({
        title: "No Data",
        description: "Show data is not available. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsFindingRecommendation(true);
    setRecommendation(null);

    setTimeout(() => {
      let filteredWatchables = watchables;
      if (selectedGenre) {
        filteredWatchables = filteredWatchables.filter(w => w.genres?.includes(selectedGenre));
      }
      if (selectedType) {
        filteredWatchables = filteredWatchables.filter(w => w.type === selectedType);
      }

      if (filteredWatchables.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredWatchables.length);
        setRecommendation(filteredWatchables[randomIndex]);
      } else {
        toast({
          title: "No Results",
          description: "No shows found for the selected criteria. Try broadening your search!",
        });
        console.log("No watchables found for the selected criteria.");
      }
      setIsFindingRecommendation(false);
    }, 700); 
  };

  const handleGenreChange = (value: string) => {
    if (value === INTERNAL_ANY_GENRE_VALUE) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(value);
    }
  };

  const handleTypeChange = (value: string) => {
    if (value === INTERNAL_ANY_TYPE_VALUE) {
      setSelectedType("");
    } else {
      setSelectedType(value);
    }
  };
  
  const isLoading = isLoadingWatchables || isFindingRecommendation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-gray-200 flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-teal-500 selection:text-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Can't Decide What to Watch?
          </span>
        </h1>
        <p className="text-lg text-gray-400">Let us pick something for you from live TV show data!</p>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center space-y-8">
        {fetchError && (
          <div className="p-4 bg-red-800/70 text-red-200 rounded-lg flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Error loading show data. Some features might be limited. Using fallback genres/types.</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full p-6 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700">
          <div>
            <label htmlFor="genre-select" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Genre</label>
            <Select value={selectedGenre} onValueChange={handleGenreChange} disabled={isLoadingWatchables && !watchables}>
              <SelectTrigger id="genre-select" className="w-full bg-slate-700 border-slate-600 text-gray-200 focus:ring-teal-500">
                <ListFilter className="h-4 w-4 mr-2 opacity-70" />
                <SelectValue placeholder="Any Genre" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-gray-200">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">Select Genre</SelectLabel>
                  <SelectItem value={INTERNAL_ANY_GENRE_VALUE} className="hover:bg-slate-700">Any Genre</SelectItem>
                  {availableGenres.map(genre => (
                    <SelectItem key={genre} value={genre} className="hover:bg-slate-700">{genre}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="type-select" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Type</label>
            <Select value={selectedType} onValueChange={handleTypeChange} disabled={isLoadingWatchables && !watchables}>
              <SelectTrigger id="type-select" className="w-full bg-slate-700 border-slate-600 text-gray-200 focus:ring-teal-500">
                {/* Using generic ListFilter icon as specific types are dynamic now */}
                <ListFilter className="h-4 w-4 mr-2 opacity-70" />
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-gray-200">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">Select Type</SelectLabel>
                  <SelectItem value={INTERNAL_ANY_TYPE_VALUE} className="hover:bg-slate-700">Any Type</SelectItem>
                  {availableTypes.map(type => (
                    <SelectItem key={type} value={type} className="hover:bg-slate-700">{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleFindRecommendation} 
            disabled={isLoading || (!watchables && !fetchError)}
            className="sm:col-span-2 w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 text-base rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <Shuffle className="h-5 w-5 mr-2" />
            )}
            {isFindingRecommendation ? 'Thinking...' : (isLoadingWatchables ? 'Loading Shows...' : 'Suggest Something!')}
          </Button>
        </div>

        {recommendation && (
          <div className="mt-12 w-full flex justify-center animate-fade-in animate-scale-in">
            <WatchableCard item={recommendation} />
          </div>
        )}
        {!recommendation && !isLoading && !fetchError && watchables && (
           <div className="mt-12 text-center text-gray-500">
             <p>Select your preferences and click the button to get a suggestion!</p>
           </div>
        )}
         {!recommendation && !isLoading && fetchError && (
           <div className="mt-12 text-center text-yellow-400">
             <p>Could not load shows. Please check your connection or try again later.</p>
           </div>
        )}
      </main>

      <footer className="mt-auto pt-12 pb-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} WhatToWatch Randomizer. Data from <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">TVMaze.com</a>. Built with Lovable.</p>
      </footer>
    </div>
  );
};

export default Index;

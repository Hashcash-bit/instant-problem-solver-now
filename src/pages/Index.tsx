
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import WatchableCard from "@/components/WatchableCard";
import { watchables, genres as allGenres, types as allTypes, Watchable } from "@/data/watchables";
import { Shuffle, Film, Tv2, ListFilter } from 'lucide-react';

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [recommendation, setRecommendation] = useState<Watchable | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const availableGenres = useMemo(() => {
    if (selectedType) {
      const filtered = watchables.filter(w => w.type === selectedType);
      return [...new Set(filtered.map(w => w.genre))].sort();
    }
    return allGenres.sort();
  }, [selectedType]);

  const availableTypes = useMemo(() => {
    if (selectedGenre) {
      const filtered = watchables.filter(w => w.genre === selectedGenre);
      return [...new Set(filtered.map(w => w.type))].sort();
    }
    return allTypes.sort();
  }, [selectedGenre]);

  const handleFindRecommendation = () => {
    setIsLoading(true);
    setRecommendation(null);

    setTimeout(() => {
      let filteredWatchables = watchables;
      if (selectedGenre) {
        filteredWatchables = filteredWatchables.filter(w => w.genre === selectedGenre);
      }
      if (selectedType) {
        filteredWatchables = filteredWatchables.filter(w => w.type === selectedType);
      }

      if (filteredWatchables.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredWatchables.length);
        setRecommendation(filteredWatchables[randomIndex]);
      } else {
        //  Handle no results - maybe show a toast or message
        // For now, just sets recommendation to null which will clear any previous one
        console.log("No watchables found for the selected criteria.");
      }
      setIsLoading(false);
    }, 700); // Simulate loading
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-gray-200 flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-teal-500 selection:text-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Can't Decide What to Watch?
          </span>
        </h1>
        <p className="text-lg text-gray-400">Let us pick something for you!</p>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full p-6 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700">
          <div>
            <label htmlFor="genre-select" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre-select" className="w-full bg-slate-700 border-slate-600 text-gray-200 focus:ring-teal-500">
                <ListFilter className="h-4 w-4 mr-2 opacity-70" />
                <SelectValue placeholder="Any Genre" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-gray-200">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">Select Genre</SelectLabel>
                  <SelectItem value="" className="hover:bg-slate-700">Any Genre</SelectItem>
                  {availableGenres.map(genre => (
                    <SelectItem key={genre} value={genre} className="hover:bg-slate-700">{genre}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="type-select" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type-select" className="w-full bg-slate-700 border-slate-600 text-gray-200 focus:ring-teal-500">
                {selectedType === "Movie" ? <Film className="h-4 w-4 mr-2 opacity-70" /> : selectedType === "TV Show" ? <Tv2 className="h-4 w-4 mr-2 opacity-70" /> : <ListFilter className="h-4 w-4 mr-2 opacity-70" />}
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-gray-200">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">Select Type</SelectLabel>
                  <SelectItem value="" className="hover:bg-slate-700">Any Type</SelectItem>
                  {availableTypes.map(type => (
                    <SelectItem key={type} value={type} className="hover:bg-slate-700">{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleFindRecommendation} 
            disabled={isLoading}
            className="sm:col-span-2 w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 text-base rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <Shuffle className="h-5 w-5 mr-2" />
            )}
            {isLoading ? 'Thinking...' : 'Suggest Something!'}
          </Button>
        </div>

        {recommendation && (
          <div className="mt-12 w-full flex justify-center animate-fade-in animate-scale-in">
            <WatchableCard item={recommendation} />
          </div>
        )}
        {!recommendation && !isLoading && (
           <div className="mt-12 text-center text-gray-500">
             <p>Select your preferences and click the button to get a suggestion!</p>
           </div>
        )}
      </main>

      <footer className="mt-auto pt-12 pb-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} WhatToWatch Randomizer. Built with Lovable.</p>
      </footer>
    </div>
  );
};

export default Index;

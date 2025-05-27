
export interface Watchable {
  id: number;
  name: string; // Was 'title'
  type: string; // From TVMaze 'type' field (e.g., "Scripted", "Animation")
  genres: string[]; // Was 'genre' (string)
  summary: string; // Was 'description', may contain HTML
  premiered: string; // e.g., "2024-05-27", was 'year' (number)
  image?: { // Image object from TVMaze
    medium?: string;
    original?: string;
  };
  rating?: {
    average?: number | null;
  };
  url?: string; // Added URL property from TVMaze API
  // Add any other fields you might need from TVMaze API
  // For example:
  // language?: string;
  // status?: string;
}

// Static 'watchables', 'genres', and 'types' arrays are removed.
// They will be dynamically populated or handled in Index.tsx from API data.

export const genres_hardcoded_fallback = [ // Fallback in case API genres are too sparse initially
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Espionage",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Legal",
  "Medical",
  "Music",
  "Mystery",
  "Romance",
  "Science-Fiction",
  "Sports",
  "Supernatural",
  "Thriller",
  "War",
  "Western",
];

export const types_hardcoded_fallback = [ // Fallback for types
    "Scripted",
    "Animation",
    "Reality",
    "Talk Show",
    "Documentary",
];

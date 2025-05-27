
export interface Watchable {
  id: number;
  title: string;
  type: 'Movie' | 'TV Show';
  genre: string;
  description: string;
  year: number;
  imageKey: string; // Key from placeholder_images
}

export const watchables: Watchable[] = [
  {
    id: 1,
    title: "Cosmic Odyssey",
    type: "Movie",
    genre: "Sci-Fi",
    description: "A thrilling journey to the edge of the universe to uncover ancient secrets that could save humanity.",
    year: 2024,
    imageKey: "photo-1518770660439-4636190af475", // circuit board
  },
  {
    id: 2,
    title: "The Last Algorithm",
    type: "TV Show",
    genre: "Thriller",
    description: "In a world governed by AI, a rogue programmer fights to expose a conspiracy hidden within the code.",
    year: 2023,
    imageKey: "photo-1461749280684-dccba630e2f6", // code on monitor
  },
  {
    id: 3,
    title: "Chronicles of Eldoria",
    type: "TV Show",
    genre: "Fantasy",
    description: "Epic battles and magical creatures abound as heroes rise to defend the mystical land of Eldoria.",
    year: 2022,
    imageKey: "photo-1487058792275-0ad4aaf24ca7", // colorful code
  },
  {
    id: 4,
    title: "Sunset Boulevard Mysteries",
    type: "Movie",
    genre: "Mystery",
    description: "A grizzled detective uncovers dark secrets in the glamorous but deadly world of 1940s Hollywood.",
    year: 2025,
    imageKey: "photo-1721322800607-8c38375eef04", // living room
  },
  {
    id: 5,
    title: "Quantum Leap Frog",
    type: "Movie",
    genre: "Comedy",
    description: "A scientist accidentally swaps bodies with his pet frog, leading to amphibious antics and laugh-out-loud chaos.",
    year: 2023,
    imageKey: "photo-1488590528505-98d2b5aba04b", // laptop
  },
  {
    id: 6,
    title: "Cyber City Renegades",
    type: "TV Show",
    genre: "Action",
    description: "A group of hackers and street fighters take on a corrupt mega-corporation in a neon-drenched metropolis.",
    year: 2024,
    imageKey: "photo-1531297484001-80022131f5a1", // gray laptop
  },
  {
    id: 7,
    title: "Echoes of Tomorrow",
    type: "Movie",
    genre: "Drama",
    description: "A woman receives messages from her future self, forcing her to confront difficult choices about her life.",
    year: 2022,
    imageKey: "photo-1581091226825-a6a2a5aee158", // woman with laptop
  },
  {
    id: 8,
    title: "Midnight Diner Stories",
    type: "TV Show",
    genre: "Slice of Life",
    description: "Heartwarming and quirky tales from a late-night diner that serves more than just food.",
    year: 2021,
    imageKey: "photo-1605810230434-7631ac76ec81", // people around screens
  },
];

export const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Slice of Life",
  "Animation",
];
export const types = ["Movie", "TV Show"];

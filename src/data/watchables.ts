
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
  {
    id: 9,
    title: "Galaxy Drifters",
    type: "TV Show",
    genre: "Sci-Fi",
    description: "A ragtag crew of smugglers and explorers traverse unknown galaxies, encountering strange new worlds and civilizations.",
    year: 2023,
    imageKey: "photo-1470813740244-df37b8c1edcb", // blue starry night
  },
  {
    id: 10,
    title: "The Enigma of Pine Creek",
    type: "Movie",
    genre: "Mystery",
    description: "A journalist investigates a series of bizarre disappearances in a remote, eerie town with a hidden past.",
    year: 2024,
    imageKey: "photo-1500673922987-e212871fec22", // yellow lights between trees
  },
  {
    id: 11,
    title: "Neon Knights",
    type: "Movie",
    genre: "Action",
    description: "In a dystopian future, two renegade warriors fight for freedom against an oppressive regime.",
    year: 2025,
    imageKey: "photo-1526374965328-7f61d4dc18c5", // Matrix movie still
  },
  {
    id: 12,
    title: "Whispers of the Ancient Wood",
    type: "TV Show",
    genre: "Fantasy",
    description: "A young sorceress discovers her destiny is tied to an enchanted forest and its mythical guardians.",
    year: 2022,
    imageKey: "photo-1506744038136-46273834b3fb", // body of water surrounded by trees
  },
  {
    id: 13,
    title: "Love in the Time of Pixels",
    type: "Movie",
    genre: "Romance",
    description: "Two gamers find love through a virtual reality world, but struggle to connect in real life.",
    year: 2023,
    imageKey: "photo-1649972904349-6e44c42644a7", // woman on bed with laptop
  },
  {
    id: 14,
    title: "Culinary Chaos",
    type: "TV Show",
    genre: "Comedy",
    description: "A disastrously untalented chef inherits a high-end restaurant and must learn to cook with hilarious results.",
    year: 2024,
    imageKey: "photo-1488590528505-98d2b5aba04b", // (re-using) laptop, could be recipe research
  },
  {
    id: 15,
    title: "The Haunting of Hill House Reimagined",
    type: "TV Show",
    genre: "Horror",
    description: "A modern take on the classic tale, following a fractured family confronting the terrifying secrets of their ancestral home.",
    year: 2023,
    imageKey: "photo-1721322800607-8c38375eef04", // (re-using) living room, could be eerie
  },
  {
    id: 16,
    title: "Planet Explorers Jr.",
    type: "TV Show",
    genre: "Animation",
    description: "A group of curious kids travels the galaxy in their spaceship, learning about different planets and aliens.",
    year: 2024,
    imageKey: "photo-1487058792275-0ad4aaf24ca7", // (re-using) colorful code, abstract for animation
  },
];

export const genres = [
  "Action",
  "Animation",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Thriller",
];
export const types = ["Movie", "TV Show"];


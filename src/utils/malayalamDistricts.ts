
export interface District {
  id: string;
  name: string;
  englishName: string;
}

export const keralaDistricts: District[] = [
  { id: 'alappuzha', name: 'ആലപ്പുഴ', englishName: 'Alappuzha' },
  { id: 'ernakulam', name: 'എറണാകുളം', englishName: 'Ernakulam' },
  { id: 'idukki', name: 'ഇടുക്കി', englishName: 'Idukki' },
  { id: 'kannur', name: 'കണ്ണൂർ', englishName: 'Kannur' },
  { id: 'kasaragod', name: 'കാസർഗോഡ്', englishName: 'Kasaragod' },
  { id: 'kollam', name: 'കൊല്ലം', englishName: 'Kollam' },
  { id: 'kottayam', name: 'കോട്ടയം', englishName: 'Kottayam' },
  { id: 'kozhikode', name: 'കോഴിക്കോട്', englishName: 'Kozhikode' },
  { id: 'malappuram', name: 'മലപ്പുറം', englishName: 'Malappuram' },
  { id: 'palakkad', name: 'പാലക്കാട്', englishName: 'Palakkad' },
  { id: 'pathanamthitta', name: 'പത്തനംതിട്ട', englishName: 'Pathanamthitta' },
  { id: 'thiruvananthapuram', name: 'തിരുവനന്തപുരം', englishName: 'Thiruvananthapuram' },
  { id: 'thrissur', name: 'തൃശ്ശൂർ', englishName: 'Thrissur' },
  { id: 'wayanad', name: 'വയനാട്', englishName: 'Wayanad' },
];

export type FoodType = 'veg' | 'non-veg' | 'both';

export interface FoodTypeOption {
  id: FoodType;
  name: string;
  englishName: string;
}

export const foodTypes: FoodTypeOption[] = [
  { id: 'veg', name: 'സസ്യാഹാരം', englishName: 'Vegetarian' },
  { id: 'non-veg', name: 'മാംസാഹാരം', englishName: 'Non-Vegetarian' },
  { id: 'both', name: 'രണ്ടും', englishName: 'Both' },
];

export interface FrequencyOption {
  id: string;
  name: string;
  englishName: string;
}

export const frequencyOptions: FrequencyOption[] = [
  { id: 'single', name: 'ഒറ്റത്തവണ', englishName: 'Single Day' },
  { id: 'daily', name: 'എല്ലാ ദിവസവും', englishName: 'Everyday' },
];

export interface MosqueData {
  id: string;
  name: string;
  district: string;
  foodDetails: string;
  foodType: FoodType;
  date: string;
  frequency: string;
  likes: number;
  dislikes: number;
  verifiedCount: number;
  totalVotes: number;
  createdAt: string;
}

// Sample mosque data
export const sampleMosques: MosqueData[] = [
  {
    id: '1',
    name: 'മഹല്ല് മസ്ജിദ്',
    district: 'kozhikode',
    foodDetails: 'ബിരിയാണി, ചിക്കൻ കറി, പായസം',
    foodType: 'non-veg',
    date: '2025-03-06',
    frequency: 'daily',
    likes: 24,
    dislikes: 2,
    verifiedCount: 18,
    totalVotes: 20,
    createdAt: '2025-03-05T14:30:00Z'
  },
  {
    id: '2',
    name: 'ജുമാ മസ്ജിദ്',
    district: 'malappuram',
    foodDetails: 'പുട്ട്, കടല കറി, ചായ',
    foodType: 'veg',
    date: '2025-03-07',
    frequency: 'single',
    likes: 15,
    dislikes: 1,
    verifiedCount: 12,
    totalVotes: 14,
    createdAt: '2025-03-06T09:15:00Z'
  },
  {
    id: '3',
    name: 'മർകസ് മസ്ജിദ്',
    district: 'kannur',
    foodDetails: 'കഞ്ഞി, പഴം, മീൻ കറി',
    foodType: 'both',
    date: '2025-03-08',
    frequency: 'daily',
    likes: 32,
    dislikes: 3,
    verifiedCount: 25,
    totalVotes: 28,
    createdAt: '2025-03-06T18:45:00Z'
  }
];

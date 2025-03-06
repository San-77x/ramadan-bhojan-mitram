
import { useState } from "react";
import { keralaDistricts, foodTypes } from "../utils/malayalamDistricts";

interface SearchBarProps {
  onSearch: (filters: {
    district: string;
    date: string;
    foodType: string;
    keyword: string;
  }) => void;
  isCompact?: boolean;
}

const SearchBar = ({ onSearch, isCompact = false }: SearchBarProps) => {
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [foodType, setFoodType] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      district,
      date,
      foodType,
      keyword,
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`glass-card rounded-lg shadow-lg p-4 ${
        isCompact ? "w-full" : "w-full max-w-4xl mx-auto"
      }`}
    >
      <div className={`grid ${isCompact ? 'grid-cols-1 md:grid-cols-2 gap-3' : 'grid-cols-1 md:grid-cols-4 gap-4'}`}>
        <div className="space-y-2">
          <label htmlFor="keyword" className="block text-sm font-medium text-ramadan-green">
            മസ്ജിദ് തിരയുക
          </label>
          <input
            type="text"
            id="keyword"
            placeholder="മസ്ജിദിന്റെ പേര്"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="ramadan-input w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="district" className="block text-sm font-medium text-ramadan-green">
            സ്ഥലം
          </label>
          <select
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="ramadan-input w-full"
          >
            <option value="">എല്ലാ ജില്ലകളും</option>
            {keralaDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-ramadan-green">
            തീയതി
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ramadan-input w-full"
            min="2025-03-06"
            max="2025-04-04"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="foodType" className="block text-sm font-medium text-ramadan-green">
            ഭക്ഷണ തരം
          </label>
          <select
            id="foodType"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className="ramadan-input w-full"
          >
            <option value="">എല്ലാം</option>
            {foodTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          type="submit"
          className="bg-ramadan-green text-white px-6 py-2 rounded-md font-medium hover:bg-ramadan-green/90 focus:outline-none focus:ring-2 focus:ring-ramadan-green/50 transition-all duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

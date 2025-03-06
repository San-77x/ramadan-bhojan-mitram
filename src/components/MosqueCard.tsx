
import { useState } from "react";
import { formatDate, formatRelativeTime } from "../utils/dateUtils";
import { keralaDistricts } from "../utils/malayalamDistricts";
import type { MosqueData } from "../utils/malayalamDistricts";

interface MosqueCardProps {
  mosque: MosqueData;
}

const MosqueCard = ({ mosque }: MosqueCardProps) => {
  const [likes, setLikes] = useState(mosque.likes);
  const [dislikes, setDislikes] = useState(mosque.dislikes);
  const [verifiedCount, setVerifiedCount] = useState(mosque.verifiedCount);
  const [totalVotes, setTotalVotes] = useState(mosque.totalVotes);
  const [hasVotedLike, setHasVotedLike] = useState(false);
  const [hasVotedDislike, setHasVotedDislike] = useState(false);
  const [hasVotedVerification, setHasVotedVerification] = useState(false);
  
  const district = keralaDistricts.find(d => d.id === mosque.district);
  
  const handleLike = () => {
    if (!hasVotedLike && !hasVotedDislike) {
      setLikes(likes + 1);
      setHasVotedLike(true);
    }
  };
  
  const handleDislike = () => {
    if (!hasVotedDislike && !hasVotedLike) {
      setDislikes(dislikes + 1);
      setHasVotedDislike(true);
    }
  };
  
  const handleVerify = (isVerified: boolean) => {
    if (!hasVotedVerification) {
      setVerifiedCount(isVerified ? verifiedCount + 1 : verifiedCount);
      setTotalVotes(totalVotes + 1);
      setHasVotedVerification(true);
    }
  };
  
  const verificationPercentage = totalVotes > 0 
    ? Math.round((verifiedCount / totalVotes) * 100) 
    : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-ramadan-green/10 animate-fade-in">
      <div className="bg-ramadan-green p-3 text-white flex justify-between items-center">
        <h3 className="font-bold text-lg">{mosque.name}</h3>
        <span className="text-xs bg-white text-ramadan-green px-2 py-1 rounded-full">
          {mosque.frequency === 'daily' ? 'എല്ലാ ദിവസവും' : 'ഒറ്റത്തവണ'}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-ramadan-green">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{district?.name || mosque.district}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-ramadan-green">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{formatDate(mosque.date)}</span>
        </div>
        
        <div className="mb-4 pb-3 border-b border-gray-100">
          <p className="font-medium mb-1 text-gray-700">ലഭ്യമായ ഭക്ഷണം:</p>
          <p className="text-gray-600">{mosque.foodDetails}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex space-x-3">
            <button 
              onClick={handleLike}
              disabled={hasVotedLike || hasVotedDislike}
              className={`flex items-center space-x-1 text-sm px-2 py-1 rounded-md transition-colors ${
                hasVotedLike ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={hasVotedLike ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v12"></path>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
              </svg>
              <span>{likes}</span>
            </button>
            
            <button 
              onClick={handleDislike}
              disabled={hasVotedLike || hasVotedDislike}
              className={`flex items-center space-x-1 text-sm px-2 py-1 rounded-md transition-colors ${
                hasVotedDislike ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={hasVotedDislike ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 14V2"></path>
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
              </svg>
              <span>{dislikes}</span>
            </button>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="mr-2">സത്യമാണോ?</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleVerify(true)}
                disabled={hasVotedVerification}
                className={`px-2 py-1 rounded-md ${
                  hasVotedVerification ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                {verificationPercentage}% ശരി
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 text-right">
          {formatRelativeTime(mosque.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default MosqueCard;

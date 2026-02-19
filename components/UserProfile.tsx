import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Crown, Star, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  const getMembershipIcon = () => {
    switch (user.membershipTier) {
      case 'elite':
        return <Crown size={16} className="text-yellow-400" />;
      case 'premium':
        return <Star size={16} className="text-purple-400" />;
      default:
        return <Shield size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-all group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C59B6D] to-[#E9C46A] flex items-center justify-center">
          <span className="text-black font-black text-sm">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-white text-sm font-medium hidden sm:block">
          {user.name}
        </span>
        <div className="flex items-center gap-1">
          {getMembershipIcon()}
          <ChevronDown 
            size={16} 
            className={`text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>

      <ProfileModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
};

export default UserProfile;

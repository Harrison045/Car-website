import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Calendar, Shield, Crown, Star, Settings, LogOut, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const getMembershipIcon = () => {
    switch (user?.membershipTier) {
      case 'elite':
        return <Crown size={16} className="text-yellow-400" />;
      case 'premium':
        return <Star size={16} className="text-purple-400" />;
      default:
        return <Shield size={16} className="text-blue-400" />;
    }
  };

  const getMembershipColor = () => {
    switch (user?.membershipTier) {
      case 'elite':
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5';
      case 'premium':
        return 'text-purple-400 border-purple-400/20 bg-purple-400/5';
      default:
        return 'text-blue-400 border-blue-400/20 bg-blue-400/5';
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!user) return;

    const result = await updateProfile({
      name: formData.name,
      email: formData.email
    });

    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditMode(false);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);

    if (result.success) {
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to change password' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-8 border-b border-white/5">
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C59B6D] to-[#E9C46A] flex items-center justify-center">
                <span className="text-black font-black text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-display font-bold uppercase italic tracking-tighter text-white mb-2">
                  {user.name}
                </h2>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${getMembershipColor()}`}>
                  {getMembershipIcon()}
                  <span className="uppercase">{user.membershipTier} member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'profile'
                  ? 'text-white border-b-2 border-[#C59B6D]'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-4 px-6 text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === 'security'
                  ? 'text-white border-b-2 border-[#C59B6D]'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Security
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {message && (
                  <div className={`p-4 rounded-full border flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    <Check size={16} />
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white/60">
                    <Mail size={20} />
                    <div>
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs opacity-60">Email address</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/60">
                    <Calendar size={20} />
                    <div>
                      <p className="text-sm font-medium">{formatDate(user.joinDate)}</p>
                      <p className="text-xs opacity-60">Member since</p>
                    </div>
                  </div>
                </div>

                {editMode ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder-white/40 focus:outline-none focus:border-[#C59B6D] transition-all"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 py-4 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#C59B6D] transition-all"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setFormData({ name: user.name, email: user.email });
                        }}
                        className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <Settings size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                {message && (
                  <div className={`p-4 rounded-full border flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    <Check size={16} />
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#C59B6D] transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all"
                      >
                        {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#C59B6D] transition-all"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all"
                      >
                        {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#C59B6D] transition-all"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all"
                      >
                        {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#C59B6D] transition-all flex items-center justify-center gap-3"
                  >
                    <Lock size={16} />
                    Change Password
                  </button>
                </form>
              </div>
            )}

            {/* Logout Button */}
            <div className="pt-8 border-t border-white/5">
              <button
                onClick={logout}
                className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-red-500/20 transition-all flex items-center justify-center gap-3"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;

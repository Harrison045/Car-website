import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Car,
  TrendingUp,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminAuthService } from "../services/adminAuthService";

const AdminNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuthService.logout();
    window.location.href = "/admin/login";
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Website View", path: "/", icon: Car },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 flex justify-between items-center h-20">
        <div className="flex items-center gap-12">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <span className="font-display text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-[#C59B6D] transition-colors">
              Lumina <span className="text-[#C59B6D]">Admin</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                  location.pathname === link.path
                    ? "text-[#C59B6D]"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <link.icon size={14} />
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut size={14} /> Terminate
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505] border-b border-white/5 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[.4em] ${
                    location.pathname === link.path
                      ? "text-[#C59B6D]"
                      : "text-white"
                  }`}
                >
                  <link.icon size={16} /> {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.4em] text-red-500 pt-4 border-t border-white/5"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminNavbar;

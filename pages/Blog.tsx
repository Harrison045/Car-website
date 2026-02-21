import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BLOGS } from "../data/mockData";
import { ArrowUpRight } from "lucide-react";

const Blog: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-8">
        <header className="mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.8em] text-black/20 mb-8 block"
          >
            Media & Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[8rem] font-display font-black uppercase italic tracking-tighter leading-none"
          >
            Lumina <br /> <span className="text-black/10">Stories</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {BLOGS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative overflow-hidden aspect-[16/11] mb-10 rounded-2xl shadow-sm">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={post.title}
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-sm">
                    {post.category}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">
                    {post.date}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-black/10" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">
                    {post.readTime}
                  </span>
                </div>

                <h4 className="text-[28px] font-bold text-black leading-tight mb-6 group-hover:text-black/60 transition-colors">
                  {post.title}
                </h4>

                <p className="text-[15px] text-black/50 leading-relaxed font-medium mb-10 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.image}
                      className="w-8 h-8 rounded-full object-cover grayscale"
                      alt={post.author.name}
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOGS } from '../data/mockData';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const post = BLOGS.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) return (
    <div className="pt-60 text-center h-screen bg-white">
      <h1 className="text-4xl font-display font-black uppercase italic mb-8">Post Not Found</h1>
      <Link to="/blog" className="text-xs font-black uppercase tracking-widest border-b border-black pb-2">Return to Stories</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src={post.image} 
          className="w-full h-full object-cover" 
          alt={post.title} 
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-24 max-w-[1600px] mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white mb-12 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Media
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-5 py-2 bg-[#C59B6D] text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase italic text-white tracking-tighter leading-tight mb-12">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-4">
                <img src={post.author.image} className="w-12 h-12 rounded-full object-cover" alt={post.author.name} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">{post.author.name}</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Calendar size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Clock size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-32 px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <div className="prose prose-xl prose-neutral max-w-none">
              <p className="text-2xl font-light text-black/80 leading-relaxed mb-16 italic border-l-4 border-[#C59B6D] pl-10">
                {post.excerpt}
              </p>
              
              <div className="text-lg text-black/60 leading-[1.8] space-y-10 font-medium whitespace-pre-line">
                {post.content}
              </div>
            </div>
            
            <div className="mt-20 pt-10 border-t border-black/5 flex justify-between items-center">
              <div className="flex gap-4">
                {['EV', 'FUTURE', 'PERFORMANCE'].map(tag => (
                  <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                <Share2 size={16} /> Share Story
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-4 lg:sticky lg:top-48 h-fit">
            <div className="bg-neutral-50 p-10 rounded-[2.5rem] border border-black/5">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 italic">Newsletter</h4>
              <p className="text-[11px] text-black/40 uppercase font-black leading-relaxed mb-8">
                Join our private list to receive exclusive automotive insights and first access to new asset acquisitions.
              </p>
              <input 
                type="email" 
                placeholder="YOUR EMAIL..." 
                className="w-full bg-white border border-black/10 rounded-full py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black/30 mb-4" 
              />
              <button className="w-full py-4 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#C59B6D] transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-32 bg-neutral-50 border-t border-black/5">
        <div className="max-w-[1600px] mx-auto px-8">
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter mb-20">Continue <span className="text-black/20">Reading</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOGS.filter(b => b.id !== id).slice(0, 3).map(related => (
              <Link key={related.id} to={`/blog/${related.id}`} className="group">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                  <img src={related.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={related.title} />
                </div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-[#C59B6D] transition-colors">{related.title}</h4>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-black/30">
                  <span>{related.date}</span>
                  <div className="w-1 h-1 rounded-full bg-black/10" />
                  <span>{related.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
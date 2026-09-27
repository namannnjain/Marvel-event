import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Shield, ArrowLeft, Zap } from 'lucide-react';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Montserrat:wght@300;400;600;700;900&family=Oswald:wght@500;700&display=swap');
  body {
    background-color: #050505;
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
    margin: 0;
  }
  h1, h2, h3, .title-font {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
  }
  .marvel-comic-font {
    font-family: 'Bangers', cursive, sans-serif;
    letter-spacing: 3px;
  }
  .bg-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(236,29,36,0.15) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    top: -200px;
    left: -200px;
    z-index: 0;
    pointer-events: none;
    filter: blur(50px);
  }
  .bg-glow-gold {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    bottom: -100px;
    right: -100px;
    z-index: 0;
    pointer-events: none;
    filter: blur(60px);
  }
  .podium-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .podium-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px -10px rgba(234, 179, 8, 0.4),
                inset 0 0 0 1px rgba(234, 179, 8, 0.6);
  }
  .marvel-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .marvel-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: all 0.5s ease;
  }
  .marvel-btn:hover::before {
    left: 100%;
  }
`;

export default function Prizes() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-red-600 selection:text-white font-mono">
      <style>{customStyles}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bg-glow"></div>
        <div className="bg-glow-gold"></div>
      </div>

      {/* Top Navigation Back Button */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md py-4 border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white font-bold title-font px-2 py-1 text-xl tracking-tighter shadow-[0_0_15px_rgba(236,29,36,0.6)]">
              GFG
            </div>
            <span className="text-white font-bold tracking-widest text-sm uppercase hidden sm:block border-l border-white/20 pl-3">
              Bennett University • Hall of Champions
            </span>
          </div>

          <a
            href="/"
            className="marvel-btn bg-black/80 hover:bg-red-600 text-white border border-red-600/50 px-5 py-2 font-bold tracking-wider text-xs uppercase flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Mainframe
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-semibold text-xs md:text-sm animate-pulse backdrop-blur-md">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>INFINITY STONES OF VICTORY • REWARDS REPOSITORY</span>
          </div>
          <h1 className="marvel-comic-font text-6xl md:text-8xl text-yellow-500 tracking-wider drop-shadow-[0_0_25px_rgba(234,179,8,0.6)]">
            HALL OF <span className="text-white">CHAMPIONS</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            He who conquers the multiverse claims ultimate glory and bountiful rewards. Inspect the elite prize tiers below.
          </p>
        </div>

        {/* Prize Podium Stand Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl items-end my-8">
          
          {/* 2nd Place (Left - Lower Height) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="podium-card bg-gradient-to-b from-gray-900 to-black border-2 border-slate-400/40 rounded-2xl p-6 text-center relative shadow-[0_0_30px_rgba(148,163,184,0.15)] order-2 md:order-1 mt-6 md:mt-16"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center shadow-lg overflow-hidden">
              <img src="/captainamerica.png" alt="2nd Place Character" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
              <span className="absolute text-2xl">🛡️</span>
            </div>
            
            <div className="pt-10">
              <span className="bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-400/40">
                2nd Place • Silver Vanguard
              </span>
              <h3 className="title-font text-4xl font-black text-slate-300 mt-4 mb-2">₹7,000</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Awarded to the runner-up squad demonstrating exceptional architectural design, tactical execution, and robust problem-solving in the multiverse.
              </p>
            </div>
          </motion.div>

          {/* 1st Place (Middle - Highest Height) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="podium-card bg-gradient-to-b from-yellow-950/40 to-black border-2 border-yellow-500/60 rounded-2xl p-8 text-center relative shadow-[0_0_50px_rgba(234,179,8,0.3)] order-1 md:order-2 z-20"
          >
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-yellow-900 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.8)] overflow-hidden">
              <img src="/ironman.png" alt="1st Place Character" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
              <span className="absolute text-3xl">🦾</span>
            </div>

            <div className="pt-12">
              <span className="bg-yellow-500 text-black font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.8)]">
                1st Place • Supreme Conqueror
              </span>
              <h3 className="title-font text-5xl font-black text-yellow-400 mt-4 mb-3">₹10,000</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                The ultimate grand prize for the supreme developers who master all infinity stones. Includes exclusive tech swags, cash bounties, and direct mentorship.
              </p>
            </div>
          </motion.div>

          {/* 3rd Place (Right - Lowest Height) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="podium-card bg-gradient-to-b from-amber-950/40 to-black border-2 border-amber-700/40 rounded-2xl p-6 text-center relative shadow-[0_0_30px_rgba(180,83,9,0.15)] order-3 md:order-3 mt-6 md:mt-24"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-900 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-lg overflow-hidden">
              <img src="/spiderman.png" alt="3rd Place Character" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
              <span className="absolute text-2xl">🕸️</span>
            </div>

            <div className="pt-10">
              <span className="bg-amber-900/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-600/40">
                3rd Place • Bronze Sentinel
              </span>
              <h3 className="title-font text-4xl font-black text-amber-500 mt-4 mb-2">₹5,000</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Recognizing the brilliant minds who clinch the final podium spot with phenomenal innovation and relentless coding resilience under pressure.
              </p>
            </div>
          </motion.div>

        </div>

      </main>

      <footer className="bg-black border-t border-white/10 py-8 text-center text-xs text-gray-600 tracking-widest uppercase relative z-10">
        <p>&copy; 2026 GFG Student Chapter Bennett University. All rights reserved.</p>
      </footer>
    </div>
  );
}
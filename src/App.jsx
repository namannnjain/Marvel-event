import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Terminal, Calendar, MapPin, Users, ChevronRight, AlertTriangle, Cpu, Globe, CheckCircle2, Award, Lock, Volume2, VolumeX, Trophy } from 'lucide-react';

// ==========================================
// FIREBASE CONFIGURATION (Direct from your console)
// ==========================================
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQX5CFkeqg5ekPPwaTJgLEOI47ad10pjg",
  authDomain: "assistance-40920.firebaseapp.com",
  projectId: "assistance-40920",
  storageBucket: "assistance-40920.firebasestorage.app",
  messagingSenderId: "77467078510",
  appId: "1:77467078510:web:f97133273220abbc38fb7f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// ERROR BOUNDARY COMPONENT
// ==========================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Marvel App Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="border border-red-600 p-8 rounded-lg max-w-lg bg-red-950/20 shadow-[0_0_30px_rgba(236,29,36,0.3)]">
            <h1 className="text-red-500 text-2xl font-bold mb-4 uppercase tracking-wider">System Malfunction Detected</h1>
            <p className="text-gray-300 text-sm mb-6">Stark Mainframe encountered an exception while rendering the UI.</p>
            <pre className="text-xs bg-black/80 p-4 rounded text-left overflow-x-auto text-red-400 mb-6 border border-red-900/50">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(236,29,36,0.5)]"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// STYLES & ASSETS
// ==========================================
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Montserrat:wght@300;400;600;700;900&family=Oswald:wght@500;700&display=swap');

  :root {
    --marvel-red: #EC1D24;
    --marvel-dark: #202020;
    --gold: #D4AF37;
  }

  html {
    scroll-behavior: smooth;
  }

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
    background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    bottom: -100px;
    right: -100px;
    z-index: 0;
    pointer-events: none;
    filter: blur(60px);
  }

  .marvel-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .marvel-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px -10px rgba(236, 29, 36, 0.3),
                inset 0 0 0 1px rgba(236, 29, 36, 0.5);
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

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--marvel-red);
  }
`;

// ==========================================
// SUB-COMPONENTS
// ==========================================

const FuturisticIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('idle');

  const handleInitialize = () => {
    setPhase('animating');
    const audioEl = document.getElementById('bg-audio');
    if (audioEl) {
      audioEl.volume = 0.25;
      audioEl.play().catch(err => console.log("Audio play blocked:", err));
    }
    
    setTimeout(() => {
      setPhase('flashing');
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 2800);
  };

  if (phase === 'flashing') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] bg-white pointer-events-none"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center font-mono overflow-hidden p-6"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-[500px] h-[500px] rounded-full border border-dashed border-red-500 flex items-center justify-center"
        >
          <div className="w-[420px] h-[420px] rounded-full border border-red-600/30"></div>
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[350px] h-[350px] rounded-full border border-red-600/60"
        />
        <motion.div
          animate={{ y: [-200, 200, -200] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[2px] bg-red-500 shadow-[0_0_15px_rgba(236,29,36,1)]"
        />
      </div>

      {phase === 'idle' && (
        <div className="relative z-30 text-center flex flex-col items-center max-w-lg">
          <div className="bg-red-600 px-8 py-3 shadow-[0_0_50px_rgba(236,29,36,0.8)] mb-6 border border-red-400">
            <span className="text-white title-font font-black text-5xl md:text-7xl tracking-tighter">GFG STUDIOS</span>
          </div>
          <p className="text-gray-300 text-sm mb-8 tracking-widest uppercase">
            Click below to initialize protocols and establish secure audio link.
          </p>
          <button
            onClick={handleInitialize}
            className="marvel-btn bg-red-600 hover:bg-red-700 text-white font-bold title-font px-8 py-4 text-xl tracking-widest uppercase shadow-[0_0_25px_rgba(236,29,36,0.8)] flex items-center gap-3"
          >
            <Zap className="w-5 h-5 animate-pulse" /> Initialize System & Audio
          </button>
        </div>
      )}

      {phase === 'animating' && (
        <div className="relative z-30 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-red-600 px-8 py-3 shadow-[0_0_50px_rgba(236,29,36,0.8)] mb-6 border border-red-400"
          >
            <span className="text-white title-font font-black text-6xl md:text-8xl tracking-tighter">GFG STUDIOS</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-red-500 text-sm tracking-widest uppercase flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 animate-spin" />
            <span>ESTABLISHING SECURE MULTIVERSE LINK...</span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const ScrollCharacters = () => {
  const { scrollYProgress } = useScroll();
  
  const ironManX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.7, 0.85], [-100, 600, 50, 700, 700]);
  const ironManY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.7, 0.85], [400, 900, 1600, 2400, 3500]);
  const ironManRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.7, 0.85], [-15, 35, -25, 45, 90]);

  const spiderManX = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.85], [800, 100, 600, 600]);
  const spiderManY = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.85], [100, 800, 2000, 3500]);
  const spiderManRotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.85], [15, -25, 35, -10]);

  const capX = useTransform(scrollYProgress, [0, 1], [200, 550]);
  const capY = useTransform(scrollYProgress, [0, 1], [400, 2100]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      <motion.div
        style={{ x: ironManX, y: ironManY, rotate: ironManRotate }}
        className="absolute left-0 top-0 w-48 md:w-64"
      >
        <img
          src="/ironman.png"
          alt="Iron Man Flying"
          className="w-full drop-shadow-[0_15px_30px_rgba(236,29,36,0.8)] object-contain"
          onError={(e) => e.target.style.display = 'none'}
        />
      </motion.div>

      <motion.div
        style={{ x: spiderManX, y: spiderManY, rotate: spiderManRotate }}
        className="absolute right-0 top-0 w-48 md:w-64 z-30"
      >
        <img
          src="/spiderman.png"
          alt="Spider-Man Swinging"
          className="w-full drop-shadow-[0_15px_30px_rgba(59,130,246,0.9)] object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
          <path d="M200 0 L100 100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="80" r="22" fill="#ef4444" />
          <path d="M85 105 Q100 95 115 105 L130 140 L105 130 L100 160 L80 135 Z" fill="#ef4444" />
          <path d="M100 102 Q105 120 120 130" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" />
          <path d="M100 102 Q85 120 70 115" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" />
          <path d="M90 75 Q95 72 100 76 Q95 79 90 75 Z" fill="#ffffff" />
          <path d="M100 76 Q105 72 110 75 Q105 79 100 76 Z" fill="#ffffff" />
        </svg>
      </motion.div>

      <motion.div
        style={{ x: capX, y: capY }}
        className="absolute left-1/4 top-1/3 w-44 md:w-60"
      >
        <img
          src="/captainamerica.png"
          alt="Captain America Action"
          className="w-full drop-shadow-[0_15px_30px_rgba(234,179,8,0.7)] object-contain"
          onError={(e) => e.target.style.display = 'none'}
        />
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-black/80 py-5 border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white font-bold title-font px-2 py-1 text-xl tracking-tighter shadow-[0_0_15px_rgba(236,29,36,0.6)]">
            GFG
          </div>
          <span className="text-white font-bold tracking-widest text-sm uppercase hidden sm:block border-l border-white/20 pl-3">
            Bennett University
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider">
          <a href="#highlights" className="text-gray-300 hover:text-red-500 transition-colors duration-200 relative group py-1">
            INITIATIVE
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#prizes" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 relative group py-1 font-bold">
            PRIZES 🏆
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#schedule" className="text-gray-300 hover:text-red-500 transition-colors duration-200 relative group py-1">
            TIMELINE
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#register" className="text-gray-300 hover:text-red-500 transition-colors duration-200 relative group py-1">
            DOSSIER
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <a
          href="#register"
          className="marvel-btn bg-white text-black title-font px-6 py-2 font-bold tracking-wider hover:bg-red-600 hover:text-white uppercase"
        >
          Assemble
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const heroBackgrounds = ['/Bg1.png', '/Bg2.png', '/Bg3.png', '/Bg4.png', '/Bg5.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center text-center overflow-hidden pt-28 pb-16 px-6 bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bg-glow"></div>
        <div className="bg-glow-gold"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 font-semibold text-xs md:text-sm animate-pulse backdrop-blur-md shadow-[0_0_20px_rgba(236,29,36,0.4)]">
          <Zap className="w-4 h-4" />
          <span>S.H.I.E.L.D. APPROVED INITIATIVE</span>
        </div>
        
        <h1 className="marvel-comic-font text-6xl md:text-8xl lg:text-9xl text-white tracking-wider drop-shadow-[0_5px_15px_rgba(236,29,36,0.7)]">
          THE <span className="text-red-600">MULTIVERSE</span> OF CODE
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full pt-4">
          <a href="#register" className="marvel-btn group bg-red-600 text-white title-font px-8 py-4 text-base md:text-lg font-bold tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(236,29,36,0.7)]">
            Secure Your Pass <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#highlights" className="marvel-btn bg-black/70 backdrop-blur-md border border-white/30 text-white title-font px-8 py-4 text-base md:text-lg font-bold tracking-widest uppercase hover:bg-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            View Protocol
          </a>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl h-64 md:h-96 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] my-10">
        {heroBackgrounds.map((bg, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              idx === currentBg ? 'opacity-90 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ backgroundImage: `url("${bg}")`, transition: 'opacity 1s ease-in-out, transform 4s ease-in-out' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 flex items-center gap-8 text-gray-200 text-xs md:text-sm font-semibold tracking-widest bg-black/80 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-[0_0_25px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-500" />
          <span>NOV 10-12, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>BENNETT UNIVERSITY</span>
        </div>
      </div>
    </section>
  );
};

const Highlights = () => {
  const features = [
    { title: "Algorithmic Warfare", desc: "Battle through intense competitive programming rounds. Optimize your code to survive the snap.", color: "from-red-900/40 to-black" },
    { title: "AI Infinity Stones", desc: "Harness the power of neural networks and machine learning to build intelligent, self-aware systems.", color: "from-amber-900/40 to-black" },
    { title: "Cyber Shield", desc: "Defend against dark web threats. Learn cryptography and ethical hacking from the masters.", color: "from-blue-900/40 to-black" },
    { title: "Web3 Multiverse", desc: "Step into the decentralized web. Build smart contracts and master blockchain technology.", color: "from-purple-900/40 to-black" }
  ];

  return (
    <section id="highlights" className="py-24 relative z-10 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-red-600 font-bold tracking-widest text-sm mb-2 uppercase">S.H.I.E.L.D. Database</h2>
            <h3 className="title-font text-4xl md:text-5xl text-white font-bold">MISSION OBJECTIVES</h3>
          </div>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed">
            Prepare yourself for 48 hours of intense hacking, building, and learning. Access cutting-edge tech and mentorship from industry heroes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className={`marvel-card relative p-8 rounded-xl bg-gradient-to-br ${feat.color} border border-white/10 overflow-hidden group cursor-pointer`}>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h4 className="title-font text-xl font-bold text-white mb-3 tracking-wide">{feat.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PrizesSection = () => {
  return (
    <section id="prizes" className="py-24 relative z-10 bg-[#060606] border-t border-white/5 font-mono">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bg-glow-gold"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-semibold text-xs md:text-sm animate-pulse backdrop-blur-md">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>INFINITY STONES OF VICTORY • REWARDS REPOSITORY</span>
          </div>
          <h2 className="marvel-comic-font text-5xl md:text-7xl text-yellow-500 tracking-wider drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]">
            HALL OF <span className="text-white">CHAMPIONS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            He who conquers the multiverse claims ultimate glory and bountiful rewards. Inspect the elite prize tiers below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto items-end my-8">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="podium-card bg-gradient-to-b from-gray-900 to-black border-2 border-slate-400/40 rounded-2xl p-6 text-center relative shadow-[0_0_30px_rgba(148,163,184,0.15)] order-2 md:order-1 mt-6 md:mt-16"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-slate-800 rounded-full border-2 border-slate-400 flex items-center justify-center shadow-lg overflow-hidden">
              <img src="/captainamerica.png" alt="2nd Place" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="podium-card bg-gradient-to-b from-yellow-950/40 to-black border-2 border-yellow-500/60 rounded-2xl p-8 text-center relative shadow-[0_0_50px_rgba(234,179,8,0.3)] order-1 md:order-2 z-20"
          >
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-yellow-900 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.8)] overflow-hidden">
              <img src="/ironman.png" alt="1st Place" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="podium-card bg-gradient-to-b from-amber-950/40 to-black border-2 border-amber-700/40 rounded-2xl p-6 text-center relative shadow-[0_0_30px_rgba(180,83,9,0.15)] order-3 md:order-3 mt-6 md:mt-24"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-900 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-lg overflow-hidden">
              <img src="/spiderman.png" alt="3rd Place" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
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
      </div>
    </section>
  );
};

const Timeline = () => {
  const schedule = [
    { time: "09:00 AM", title: "Registration & Briefing", desc: "Agents arrive. ID verification and swag distribution." },
    { time: "11:00 AM", title: "Opening Ceremony", desc: "Director's speech. Revealing the hackathon themes." },
    { time: "12:30 PM", title: "Hacking Commences", desc: "The multiverse opens. Teams start building." },
    { time: "06:00 PM", title: "Stark Tech Workshop", desc: "Guest speaker session on AI and Web3 integration." },
    { time: "11:59 PM", title: "Midnight Check-in", desc: "Pizza, energy drinks, and progress evaluation." }
  ];

  return (
    <section id="schedule" className="py-24 relative z-10 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="title-font text-4xl md:text-5xl text-white font-bold mb-4">EVENT TIMELINE</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-900 to-black hidden md:block"></div>

          <div className="space-y-12">
            {schedule.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8`}>
                  <div className="w-full md:w-1/2">
                    <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-red-600/55 transition-all duration-300 shadow-xl relative group">
                      <div className="absolute -top-3 right-6 bg-red-600 text-white text-xs font-mono px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                        {item.time}
                      </div>
                      <h4 className="title-font text-xl font-bold text-white mb-2 mt-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-red-600 border-4 border-black items-center justify-center z-10 shadow-[0_0_15px_rgba(236,29,36,0.8)]">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>

                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', enrollment: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState(null);

  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const verifyAndDownloadCSV = async () => {
    if (passcode !== "avengers2026") {
      setPasscodeError(true);
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "shield_registrations"));
      if (querySnapshot.empty) {
        alert("No agent dossiers found in cloud database yet!");
        return;
      }

      const headers = ["Pass ID", "Name", "Enrollment", "Email", "Timestamp"];
      const csvRows = [headers.join(',')];

      querySnapshot.forEach((docSnap) => {
        const reg = docSnap.data();
        csvRows.push([
          reg.passId,
          `"${reg.name}"`,
          reg.enrollment,
          reg.email,
          `"${reg.timestamp}"`
        ].join(','));
      });

      const csvBlob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `Shield_Cloud_Agents_${new Date().toISOString().slice(0,10)}.csv`);
      a.click();

      setShowPasscodeModal(false);
      setPasscode('');
      setPasscodeError(false);
    } catch (error) {
      console.error("Error fetching cloud database:", error);
      alert("Failed to access cloud database. Check Firebase rules.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.enrollment || !formData.email) {
      alert("Please fill in all clearance fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedTicket = {
        passId: 'SHIELD-' + Math.floor(100000 + Math.random() * 900000),
        name: formData.name,
        enrollment: formData.enrollment,
        email: formData.email,
        timestamp: new Date().toLocaleString()
      };

      await addDoc(collection(db, "shield_registrations"), generatedTicket);

      setIsSubmitting(false);
      setTicket(generatedTicket);
    } catch (error) {
      console.error("Error saving to Firestore: ", error);
      alert("Registration failed! Check your Firebase configuration.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="title-font text-5xl md:text-6xl text-white font-bold mb-6">
              JOIN THE <br/> <span className="text-red-600">INITIATIVE</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
              Registration is now open for Bennett University students. Form your squad and prepare for the ultimate test of skill.
            </p>

            <button
              onClick={() => setShowPasscodeModal(true)}
              className="bg-black/80 hover:bg-red-950/40 text-red-500 border border-red-600/40 font-mono text-xs px-5 py-3 rounded-lg transition uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(236,29,36,0.2)]"
            >
              <Lock className="w-4 h-4 text-red-500" />
              Director Database Access (Cloud CSV)
            </button>
          </div>

          <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative">
            {ticket ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-red-600/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto text-red-500 shadow-[0_0_20px_rgba(236,29,36,0.6)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="title-font text-3xl text-white font-bold mb-1">SEAT CONFIRMED!</h3>
                  <p className="text-red-400 text-xs font-mono uppercase tracking-widest">S.H.I.E.L.D. Cloud Security Clearance Granted</p>
                </div>

                <div className="bg-black/60 border border-red-600/40 p-6 rounded-xl text-left font-mono space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-3 py-1 uppercase font-bold tracking-widest">
                    Verified Agent
                  </div>
                  <div className="text-xs text-gray-400">PASS ID: <span className="text-white font-bold">{ticket.passId}</span></div>
                  <div className="text-xs text-gray-400">CODENAME: <span className="text-white font-bold">{ticket.name}</span></div>
                  <div className="text-xs text-gray-400">ENROLLMENT: <span className="text-white font-bold">{ticket.enrollment}</span></div>
                </div>

                <button
                  onClick={() => setTicket(null)}
                  className="w-full marvel-btn bg-white text-black title-font py-3 font-bold tracking-widest uppercase hover:bg-red-600 hover:text-white transition"
                >
                  Register Another Agent
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Codename (Full Name)</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                      placeholder="Tony Stark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enrollment No.</label>
                    <input
                      type="text"
                      required
                      value={formData.enrollment}
                      onChange={(e) => setFormData({...formData, enrollment: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                      placeholder="E23XXXX"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Comms Link (Email)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                    placeholder="tony@starkindustries.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full marvel-btn bg-red-600 text-white title-font py-4 font-bold tracking-widest uppercase mt-4 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>SYNCING TO CLOUD...</span>
                    </>
                  ) : (
                    <span>Submit Dossier & Generate Pass</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-red-600/60 p-8 rounded-2xl max-w-md w-full shadow-[0_0_40px_rgba(236,29,36,0.3)] relative font-mono">
            <h3 className="text-xl font-bold text-white mb-2 uppercase flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-500" /> S.H.I.E.L.D. Clearance
            </h3>
            <p className="text-gray-400 text-xs mb-6">Enter director passcode to download cloud agent database.</p>
            
            <input
              type="password"
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setPasscodeError(false); }}
              placeholder="Enter Passcode..."
              className="w-full bg-black/80 border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-red-500 text-sm"
            />

            {passcodeError && (
              <p className="text-red-500 text-xs mb-4 font-bold">⚠️ ACCESS DENIED: Invalid Director Passcode!</p>
            )}

            <div className="flex gap-4">
              <button
                onClick={verifyAndDownloadCSV}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg uppercase tracking-wider text-xs transition shadow-[0_0_15px_rgba(236,29,36,0.5)]"
              >
                Authenticate & Download
              </button>
              <button
                onClick={() => { setShowPasscodeModal(false); setPasscode(''); setPasscodeError(false); }}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 px-5 rounded-lg uppercase tracking-wider text-xs transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 text-center text-xs font-semibold text-gray-600 tracking-widest uppercase">
        <p>&copy; 2026 GFG Student Chapter Bennett University. All rights reserved.</p>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <ErrorBoundary>
      <style>{customStyles}</style>

      {/* Background Audio Element for multi.mp3 */}
      <audio id="bg-audio" ref={audioRef} src="/multi.mp3" loop preload="auto" />

      {/* Floating Audio Control Button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 left-6 z-50 bg-black/80 hover:bg-red-600 text-white p-3 rounded-full border border-red-600/50 shadow-[0_0_15px_rgba(236,29,36,0.5)] transition duration-300 flex items-center justify-center"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-red-500 animate-pulse" />}
      </button>
      
      <AnimatePresence>
        {showIntro && (
          <FuturisticIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#050505] selection:bg-red-600 selection:text-white relative">
        <ScrollCharacters />
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <PrizesSection />
          <Timeline />
          <Registration />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
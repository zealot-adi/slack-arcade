import React, { useState, useEffect } from 'react';

function App() {
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const fetchScraps = () => {
    setLoading(true);
    fetch('https://hackclub.com')
      .then((res) => res.json())
      .then((data) => {
        setScraps(data.slice(0, 15)); // Fetch more so we have plenty to filter!
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scraps:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchScraps();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshClick = () => {
    setRefreshCount(prev => prev + 1);
    fetchScraps();
  };

  // Filter scraps based on the username typed into the search bar
  const filteredScraps = scraps.filter(scrap => 
    scrap.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5); // Still only show top 5 matching items on the screen

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-black">
      <div className="w-full max-w-2xl bg-amber-900 border-8 border-amber-950 rounded-t-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        
        {/* Marquee Header */}
        <div className="bg-neutral-900 border-4 border-amber-950 p-4 mb-4 text-center shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]">
          <h1 className="font-['Press_Start_2P'] text-amber-500 text-xl tracking-wider animate-pulse">
            SLACK ARCADE
          </h1>
        </div>

        {/* 🔍 NEW FEATURE: Retro Pixel-Art Search Filter */}
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="ENTER USERNAME TO FILTER..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-950 border-4 border-zinc-800 rounded p-3 font-['Press_Start_2P'] text-[10px] text-cyan-400 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 shadow-inner transition-colors"
          />
        </div>

        {/* CRT Screen Container */}
        <div className="bg-neutral-900 border-8 border-zinc-800 rounded-xl p-4 relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.2),inset_0_0_50px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10"></div>
          
          <div className="relative z-0 min-h-[350px] flex flex-col justify-between font-['Press_Start_2P'] text-green-500 text-xs leading-relaxed p-2">
            <div>
              <div className="flex justify-between items-center mb-4 text-[10px] text-zinc-500">
                <span>[SYSTEM: ACTIVE]</span>
                <span>REFRESHES: {refreshCount}</span>
              </div>
              <h2 className="text-amber-400 mb-4 text-[10px]">📡 RECENT SCRAPBOOK UPDATES:</h2>

              {loading ? (
                <p className="animate-pulse text-zinc-400">PULLING LATEST FEEDS...</p>
              ) : filteredScraps.length === 0 ? (
                <p className="text-red-500 animate-pulse text-[10px]">[NO MATCHING USERS FOUND]</p>
              ) : (
                <div className="space-y-3 text-[10px]">
                  {filteredScraps.map((scrap, index) => (
                    <div key={index} className="border-b border-zinc-800 pb-2">
                      <span className="text-cyan-400">@{scrap.user.username}:</span>{' '}
                      <span className="text-zinc-300">{scrap.text.substring(0, 60)}{scrap.text.length > 60 ? '...' : ''}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t-2 border-zinc-800 pt-4 flex justify-between text-[10px] text-zinc-400 mt-4">
              <span>SYS: ONLINE</span>
              <span className="animate-pulse text-green-400">● LIVE FEED READY</span>
            </div>
          </div>
        </div>

        {/* Ticker Tape */}
        <div className="w-full bg-black border-4 border-zinc-900 mt-2 p-2 relative overflow-hidden flex items-center shadow-inner">
          <div className="whitespace-nowrap font-['Press_Start_2P'] text-[9px] text-red-500 animate-[marquee_25s_linear_infinite] inline-block">
            [CLOCK: {currentTime}] --- [STATUS: ALL SYSTEMS NOMINAL] --- [FILTER MODE ACTIVE] --- [PROD BY SHIPPER] --- 
          </div>
        </div>

        {/* Control Panel */}
        <div className="w-full bg-zinc-800 mt-4 rounded-b p-6 border-t-4 border-zinc-900 shadow-2xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-x-0 top-2 h-0.5 bg-zinc-700"></div>

          <div className="flex items-center space-x-4 pl-4 relative z-10">
            <div className="relative w-16 h-16 bg-zinc-950 rounded-full border-4 border-zinc-900 shadow-inner flex items-center justify-center">
              <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-red-800 shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer transform hover:scale-110 active:translate-x-1 active:translate-y-1 transition-transform"></div>
            </div>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-500">JOYSTICK</span>
          </div>

          <div className="flex items-center space-x-6 pr-4 relative z-10">
            <div className="flex flex-col items-center space-y-2">
              <button className="w-12 h-12 bg-cyan-600 border-b-4 border-cyan-800 active:border-b-0 active:mt-1 rounded-full shadow-lg cursor-pointer"></button>
              <span className="font-['Press_Start_2P'] text-[8px] text-zinc-400">SELECT</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <button 
                onClick={handleRefreshClick}
                className="w-14 h-14 bg-red-600 border-b-4 border-red-800 active:border-b-0 active:mt-1 rounded-full shadow-lg cursor-pointer transform hover:brightness-110 active:scale-95"
              ></button>
              <span className="font-['Press_Start_2P'] text-[8px] text-red-400 animate-pulse">REFRESH</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
      `}</style>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

function App() {
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  const fetchScraps = () => {
    setLoading(true);
    fetch('https://hackclub.com')
      .then((res) => res.json())
      .then((data) => {
        setScraps(data.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scraps:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchScraps();
  }, []);

  const handleRefreshClick = () => {
    setRefreshCount(prev => prev + 1);
    fetchScraps();
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-black">
      {/* Outer Arcade Cabinet Body */}
      <div className="w-full max-w-2xl bg-amber-900 border-8 border-amber-950 rounded-t-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        
        {/* Cabinet Marquee / Header */}
        <div className="bg-neutral-900 border-4 border-amber-950 p-4 mb-6 text-center shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]">
          <h1 className="font-['Press_Start_2P'] text-amber-500 text-xl tracking-wider animate-pulse">
            SLACK ARCADE
          </h1>
        </div>

        {/* The CRT Screen Container */}
        <div className="bg-neutral-900 border-8 border-zinc-800 rounded-xl p-4 relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.2),inset_0_0_50px_rgba(0,0,0,1)]">
          {/* CRT Scanline Overlay Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10"></div>
          
          {/* Active Screen Content */}
          <div className="relative z-0 min-h-[350px] flex flex-col justify-between font-['Press_Start_2P'] text-green-500 text-xs leading-relaxed p-2">
            <div>
              <div className="flex justify-between items-center mb-4 text-[10px] text-zinc-500">
                <span>[SYSTEM: LOGGED_IN]</span>
                <span>REFRESHES: {refreshCount}</span>
              </div>
              <h2 className="text-amber-400 mb-4 text-[10px]">📡 RECENT SCRAPBOOK UPDATES:</h2>

              {loading ? (
                <p className="animate-pulse text-zinc-400">PULLING LATEST FEEDS...</p>
              ) : (
                <div className="space-y-3 text-[10px]">
                  {scraps.map((scrap, index) => (
                    <div key={index} className="border-b border-zinc-800 pb-2 animate-[fadeIn_0.3s_ease-out]">
                      <span className="text-cyan-400">@{scrap.user.username}:</span>{' '}
                      <span className="text-zinc-300">{scrap.text.substring(0, 60)}{scrap.text.length > 60 ? '...' : ''}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t-2 border-zinc-800 pt-4 flex justify-between text-[10px] text-zinc-400 mt-4">
              <span>SYS: ACTIVE</span>
              <span className="animate-pulse text-green-400">● LIVE FEED READY</span>
            </div>
          </div>
        </div>

        {/* 🕹️ Physical Arcade Control Panel Base */}
        <div className="w-full bg-zinc-800 mt-4 rounded-b p-6 border-t-4 border-zinc-900 shadow-2xl flex items-center justify-between relative overflow-hidden">
          
          {/* Decorative Panel Lines */}
          <div className="absolute inset-x-0 top-2 h-0.5 bg-zinc-700"></div>

          {/* Left Side: Joystick Component Container */}
          <div className="flex items-center space-x-4 pl-4 relative z-10">
            <div className="relative w-16 h-16 bg-zinc-950 rounded-full border-4 border-zinc-900 shadow-inner flex items-center justify-center">
              {/* Joystick Shaft & Top Ball */}
              <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-red-800 shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer transform hover:scale-110 active:translate-x-1 active:translate-y-1 transition-transform">
                <div className="w-2 h-2 bg-red-400 rounded-full m-0.5 opacity-60"></div>
              </div>
            </div>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-500">JOYSTICK</span>
          </div>

          {/* Right Side: Interactive Action Buttons */}
          <div className="flex items-center space-x-6 pr-4 relative z-10">
            {/* Blue Button (Decorative/Future Feature) */}
            <div className="flex flex-col items-center space-y-2">
              <button className="w-12 h-12 bg-cyan-600 border-b-4 border-cyan-800 active:border-b-0 active:mt-1 rounded-full shadow-lg transition-all focus:outline-none cursor-pointer"></button>
              <span className="font-['Press_Start_2P'] text-[8px] text-zinc-400">SELECT</span>
            </div>

            {/* Red Button (Triggers API Data Refresh) */}
            <div className="flex flex-col items-center space-y-2">
              <button 
                onClick={handleRefreshClick}
                className="w-14 h-14 bg-red-600 border-b-4 border-red-800 active:border-b-0 active:mt-1 rounded-full shadow-lg transition-all focus:outline-none cursor-pointer transform hover:brightness-110 active:scale-95"
              ></button>
              <span className="font-['Press_Start_2P'] text-[8px] text-red-400 animate-pulse">REFRESH</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

function App() {
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent posts from the official Hack Club Scrapbook API
    fetch('https://hackclub.com')
      .then((res) => res.json())
      .then((data) => {
        // Take the top 5 most recent posts to display on screen
        setScraps(data.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scraps:", err);
        setLoading(false);
      });
  }, []);

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
              <p className="text-zinc-500 mb-4">[SYSTEM: LOGGED_IN]</p>
              <h2 className="text-amber-400 mb-4 text-[10px]">📡 RECENT SCRAPBOOK UPDATES:</h2>

              {loading ? (
                <p className="animate-pulse text-zinc-400">LOADING DATA STREAM...</p>
              ) : (
                <div className="space-y-3 text-[10px]">
                  {scraps.map((scrap, index) => (
                    <div key={index} className="border-b border-zinc-800 pb-2">
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

        {/* Arcade Control Panel Base */}
        <div className="w-full h-8 bg-zinc-800 mt-4 rounded-b border-t-4 border-zinc-900 shadow-md"></div>
      </div>
    </div>
  );
}

export default App;

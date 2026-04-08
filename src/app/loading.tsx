import { Inter } from "next/font/google";

//#region Font Declaration
const inter = Inter({
  subsets: ["latin"],
});
//#endregion

export default function Loading() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-24 px-4">
      {/* Animated Loader Container */}
      <div className="relative w-52 h-52 mb-10 flex items-center justify-center">
        {/* Outer rotating square ring */}
        <div
          className="absolute inset-0 rounded-2xl border border-slate-600/50"
          style={{
            animation: "spinSlow 10s linear infinite",
          }}
        />

        {/* Middle rotating square ring (counter-rotate) */}
        <div
          className="absolute inset-4 rounded-xl border border-primary/30"
          style={{
            animation: "spinSlow 8s linear infinite reverse",
          }}
        />

        {/* Inner rotating square ring */}
        <div
          className="absolute inset-8 rounded-lg border border-primary/20"
          style={{
            animation: "spinSlow 6s linear infinite",
          }}
        />

        {/* Glow background behind chip */}
        <div
          className="absolute w-24 h-24 rounded-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(142,213,255,0.15) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />

        {/* Center chip icon */}
        <div className="relative w-20 h-20 rounded-md bg-slate-800 border border-slate-600/60 flex items-center justify-center z-10">
          <div className="w-10 h-10 rounded-[3px] bg-primary/40 border border-primary/50" />
        </div>

        {/* Orbiting dot - top */}
        <div
          className="absolute w-2 h-2 rounded-full bg-primary/80"
          style={{
            top: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "pulse 2s ease-in-out infinite",
            boxShadow: "0 0 8px 2px rgba(142,213,255,0.4)",
          }}
        />

        {/* Orbiting dot - bottom-right */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-primary-dark/70"
          style={{
            bottom: "10px",
            right: "-2px",
            animation: "pulse 2.5s ease-in-out infinite 0.5s",
            boxShadow: "0 0 6px 2px rgba(56,189,248,0.3)",
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40 rounded-tl-md" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/40 rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40 rounded-br-md" />
      </div>

      {/* Text area */}
      <h2
        className={`text-xl sm:text-2xl font-bold text-primary mb-2 tracking-tight ${inter.className}`}
      >
        Initializing Environment...
      </h2>
      <p className="text-sm text-slate-500 font-mono tracking-wider uppercase mb-6">
        System Core v2.4.0 // Fetching Code Snippets
      </p>

      {/* Progress bar */}
      <div className="w-56 h-1 rounded-full bg-slate-800 overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #8ed5ff, #38BDF8)",
            animation: "progressSlide 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes progressSlide {
          0% { width: 0%; left: 0; }
          50% { width: 60%; left: 20%; }
          100% { width: 0%; left: 100%; }
        }
      `}</style>
    </div>
  );
}

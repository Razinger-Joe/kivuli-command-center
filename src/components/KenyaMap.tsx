import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";

export const KenyaMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const locations = useMemo(() => [
    { name: "Nairobi", x: 52, y: 62, beacons: 5 },
    { name: "Mombasa", x: 68, y: 78, beacons: 3 },
    { name: "Kisumu", x: 32, y: 58, beacons: 2 },
    { name: "Nakuru", x: 42, y: 56, beacons: 4 },
    { name: "Eldoret", x: 36, y: 44, beacons: 2 },
    { name: "Garissa", x: 70, y: 50, beacons: 2 },
    { name: "Nyeri", x: 52, y: 52, beacons: 1 },
  ], []);

  return (
    <div className="relative w-full h-80 bg-[#141414] rounded-lg border border-white/5 overflow-hidden">
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Simplified Kenya outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <path
          d="M 45,15 L 50,10 L 55,10 L 60,15 L 65,15 L 70,25 L 75,30 L 85,45 L 80,60 L 75,70 L 68,80 L 60,85 L 50,88 L 40,85 L 35,78 L 30,75 L 32,65 L 25,60 L 22,50 L 25,45 L 28,30 L 32,25 L 38,22 Z"
          fill="none"
          stroke="hsl(var(--cyber-green))"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>

      {/* Location beacons */}
      {locations.map((loc, i) => (
        <div
          key={loc.name}
          className="absolute"
          style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredLocation(loc.name)}
          onMouseLeave={() => setHoveredLocation(null)}
        >
          <div className="relative">
            <div className="pulse-dot scale-150" />
            <div 
              className="absolute inset-0 rounded-full bg-cyber-green animate-ping" 
              style={{ animationDelay: `${i * 0.8}s`, animationDuration: '3s', animationIterationCount: 'infinite' }}
            />
          </div>
          
          {hoveredLocation === loc.name && (
            <div className="absolute left-6 top-0 z-10 whitespace-nowrap">
              <Badge className="bg-black/90 text-cyber-green border-cyber-green/50 backdrop-blur-sm">
                {loc.name}: {loc.beacons} active beacons
              </Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

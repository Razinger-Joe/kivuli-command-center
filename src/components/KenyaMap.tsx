import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const locations = [
  { name: "Nairobi", x: 50, y: 60, beacons: 5 },
  { name: "Mombasa", x: 70, y: 80, beacons: 3 },
  { name: "Kisumu", x: 30, y: 55, beacons: 2 },
  { name: "Nakuru", x: 42, y: 52, beacons: 4 },
  { name: "Eldoret", x: 38, y: 40, beacons: 2 },
];

export const KenyaMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

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
          d="M 45,20 L 55,15 L 65,20 L 75,30 L 80,45 L 78,60 L 70,75 L 60,85 L 50,88 L 40,85 L 30,75 L 25,60 L 23,45 L 28,30 L 38,22 Z"
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
              style={{ animationDelay: `${i * 0.3}s` }}
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

import { Badge } from "@/components/ui/badge";

export const ThreatLevelBadge = ({ level }: { level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' }) => {
  const colors = {
    LOW: "bg-green-500/20 text-green-400 border-green-500/30",
    MEDIUM: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    HIGH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    CRITICAL: "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse",
  };
  return <Badge className={`${colors[level]} text-lg px-4 py-2 mt-2`}>{level}</Badge>;
};

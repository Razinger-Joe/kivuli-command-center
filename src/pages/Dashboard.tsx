import { ShieldCheck, FileWarning, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { KenyaMap } from "@/components/KenyaMap";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AttackChart } from "@/components/AttackChart";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { ThreatLevelBadge } from "@/components/ThreatLevelBadge";

const Dashboard = () => {
  const { stats, isLoading } = useDashboardStats();
  return (
    <div className="p-6 space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card-hover p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Intrusions Neutralized</p>
              {isLoading ? (
                <Skeleton className="h-10 w-24 bg-white/10" />
              ) : (
                <h3 className="text-4xl font-bold text-cyber-green animate-count-up">
                  {stats?.intrusionsNeutralized}
                </h3>
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-32 mt-2 bg-white/10" />
              ) : (
                <div className="flex items-center gap-2 mt-2 text-xs text-cyber-green">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{stats?.weeklyChange}% this week</span>
                </div>
              )}
            </div>
            <div className="p-3 rounded-lg bg-cyber-green/10">
              <ShieldCheck className="w-6 h-6 text-cyber-green" />
            </div>
          </div>
          {!isLoading && <p className="text-xs text-muted-foreground mt-4">Last updated: {new Date().toLocaleTimeString('en-US', { hour12: false })}</p>}
        </Card>

        <Card className="glass-card-hover p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Active Decoys Deployed</p>
              {isLoading ? (
                <Skeleton className="h-10 w-24 bg-white/10" />
              ) : (
                <h3 className="text-4xl font-bold text-kenyan-gold animate-count-up">
                  {stats?.activeDecoys}
                </h3>
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-32 mt-2 bg-white/10" />
              ) : (
                <p className="text-xs text-muted-foreground mt-2">
                  {stats?.activeDecoys} files monitored
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-kenyan-gold/10">
              <FileWarning className="w-6 h-6 text-kenyan-gold" />
            </div>
          </div>
          {!isLoading && <p className="text-xs text-muted-foreground mt-4">Last updated: {new Date().toLocaleTimeString('en-US', { hour12: false })}</p>}
        </Card>

        <Card className="glass-card-hover p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Threat Level</p>
              {isLoading ? (
                <Skeleton className="h-10 w-32 mt-2 bg-white/10" />
              ) : (
                <ThreatLevelBadge level={stats?.threatLevel || 'LOW'} />
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-32 mt-3 bg-white/10" />
              ) : (
                <p className="text-xs text-muted-foreground mt-3">
                  {stats?.activeZones} active monitoring zones
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          {!isLoading && <p className="text-xs text-muted-foreground mt-4">Last updated: {format(new Date(), 'HH:mm:ss')}</p>}
        </Card>
      </div>

      {/* Middle Row: Map and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Kenya Threat Map</h3>
          <KenyaMap />
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Live Activity Feed</h3>
          <ActivityFeed />
        </Card>
      </div>

      {/* Attack Frequency Chart */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Attack Frequency (Last 24 Hours)</h3>
        <AttackChart />
      </Card>
    </div>
  );
};

export default Dashboard;

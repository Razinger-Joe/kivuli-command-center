import { ShieldCheck, FileWarning, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KenyaMap } from "@/components/KenyaMap";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AttackChart } from "@/components/AttackChart";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card-hover p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total Intrusions Neutralized
              </p>
              <h3 className="text-4xl font-bold text-cyber-green animate-count-up">
                247
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-cyber-green">
                <TrendingUp className="w-3 h-3" />
                <span>+12% this week</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-cyber-green/10">
              <ShieldCheck className="w-6 h-6 text-cyber-green" />
            </div>
          </div>
        </Card>

        <Card className="glass-card-hover p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Active Decoys Deployed
              </p>
              <h3 className="text-4xl font-bold text-kenyan-gold animate-count-up">
                23
              </h3>
              <p className="text-xs text-muted-foreground mt-2">
                23 files monitored
              </p>
            </div>
            <div className="p-3 rounded-lg bg-kenyan-gold/10">
              <FileWarning className="w-6 h-6 text-kenyan-gold" />
            </div>
          </div>
        </Card>

        <Card className="glass-card-hover p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Current Threat Level
              </p>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-lg px-4 py-2 mt-2">
                MEDIUM
              </Badge>
              <p className="text-xs text-muted-foreground mt-3">
                5 active monitoring zones
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
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

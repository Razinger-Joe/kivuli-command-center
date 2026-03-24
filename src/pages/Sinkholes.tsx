import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { sinkholesData, Sinkhole } from "@/data/sinkholes";

const Sinkholes = () => {
  const [selectedSinkhole, setSelectedSinkhole] = useState<Sinkhole | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyber-green mb-2">Active Sinkholes</h1>
        <p className="text-muted-foreground">Redirect and capture malicious traffic in controlled environments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Card className="glass-card flex-1 p-4 flex items-center gap-4 border-cyber-green/20">
          <div className="p-3 bg-cyber-green/10 rounded-lg">
            <span className="text-2xl font-bold text-cyber-green">{sinkholesData.filter(s => s.status === 'Active').length}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Sinkholes</p>
          </div>
        </Card>
        <Card className="glass-card flex-1 p-4 flex items-center gap-4 border-amber-500/20">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <span className="text-2xl font-bold text-amber-500">{sinkholesData.reduce((acc, curr) => acc + curr.captures, 0)}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Attackers Captured</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sinkholesData.map((sinkhole) => (
          <Card key={sinkhole.id} className="glass-card-hover p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{sinkhole.name}</h3>
                <Badge 
                  className={
                    sinkhole.status === "Active"
                      ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                      : "bg-muted/20 text-muted-foreground border-muted/30"
                  }
                >
                  <div className={sinkhole.status === "Active" ? "pulse-dot mr-2" : "w-2 h-2 rounded-full bg-muted-foreground mr-2"} />
                  {sinkhole.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Captures:</span>
                <span className="font-bold text-cyber-green">{sinkhole.captures} attackers</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Activity:</span>
                <span className="font-mono">{sinkhole.lastActivity}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2" onClick={() => setSelectedSinkhole(sinkhole)}>
              <FileText className="w-4 h-4" />
              View Logs
            </Button>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedSinkhole} onOpenChange={(open) => !open && setSelectedSinkhole(null)}>
        <DialogContent className="bg-black border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-cyber-green flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Logs: {selectedSinkhole?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 bg-black/80 rounded-lg p-4 font-mono text-sm max-h-[60vh] overflow-y-auto">
            <div className="text-cyan-400">[{new Date(Date.now() - 3600000).toLocaleTimeString()}] INFO: Sinkhole node initialized</div>
            <div className="text-amber-400">[{new Date(Date.now() - 1800000).toLocaleTimeString()}] WARNING: Probe detected from 192.168.1.100</div>
            <div className="text-red-400">[{new Date(Date.now() - 300000).toLocaleTimeString()}] ALERT: Malware payload captured</div>
            <div className="text-cyan-400">[{new Date().toLocaleTimeString()}] INFO: Status check OK</div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setSelectedSinkhole(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sinkholes;

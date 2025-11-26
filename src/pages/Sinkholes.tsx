import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const sinkholes = [
  {
    name: "Decoy Server - Nairobi",
    status: "Active",
    captures: 12,
    lastActivity: "2 hours ago"
  },
  {
    name: "Honeypot Network - Mombasa",
    status: "Active",
    captures: 8,
    lastActivity: "45 minutes ago"
  },
  {
    name: "Trap Network - Kisumu",
    status: "Active",
    captures: 5,
    lastActivity: "3 hours ago"
  },
  {
    name: "Decoy Infrastructure - Nakuru",
    status: "Standby",
    captures: 3,
    lastActivity: "1 day ago"
  },
];

const Sinkholes = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyber-green mb-2">Active Sinkholes</h1>
        <p className="text-muted-foreground">Redirect and capture malicious traffic in controlled environments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sinkholes.map((sinkhole, i) => (
          <Card key={i} className="glass-card-hover p-6">
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

            <Button variant="outline" className="w-full gap-2">
              <FileText className="w-4 h-4" />
              View Logs
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sinkholes;

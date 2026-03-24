import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { forensicsData, ForensicsIncident } from "@/data/forensicsData";

const Forensics = () => {
  const { toast } = useToast();
  const [data, setData] = useState<ForensicsIncident[]>(forensicsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ForensicsIncident | null>(null);

  const filteredData = data.filter(item => 
    item.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.trap.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.userAgent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = "Timestamp,Triggered Trap,Attacker IP,User Agent,Dwell Time,Status\n";
    const csvData = filteredData.map(item => 
      `${item.timestamp},${item.trap},${item.ip},"${item.userAgent}",${item.dwellTime},${item.status}`
    ).join("\n");
    const blob = new Blob([headers + csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kivuli-forensics-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNeutralize = (itemToNeutralize: any) => {
    setData(prev => prev.map(item => 
      item === itemToNeutralize ? { ...item, status: "Neutralized" } : item
    ));
    toast({
      title: `Threat neutralized: ${itemToNeutralize.ip}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-green mb-2">Forensics Reports</h1>
          <p className="text-muted-foreground">Intrusion activity analysis and threat intelligence</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <Card className="glass-card p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by IP, trap name, or user agent..."
              className="pl-10 bg-black/50 border-white/10 focus:border-cyber-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setSearchQuery("")}>Filter</Button>
        </div>

        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-black/50 hover:bg-black/50 border-white/10">
                <TableHead className="text-cyber-green">Timestamp</TableHead>
                <TableHead className="text-cyber-green">Triggered Trap</TableHead>
                <TableHead className="text-cyber-green">Attacker IP</TableHead>
                <TableHead className="text-cyber-green">User Agent</TableHead>
                <TableHead className="text-cyber-green">Dwell Time</TableHead>
                <TableHead className="text-cyber-green">Status</TableHead>
                <TableHead className="text-cyber-green">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="border-white/5 hover:bg-cyber-green/10 transition-colors"
                  >
                    <TableCell className="font-mono text-xs">{item.timestamp}</TableCell>
                    <TableCell className="font-medium">{item.trap}</TableCell>
                    <TableCell className="font-mono">{item.ip}</TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                      {item.userAgent}
                    </TableCell>
                    <TableCell>{item.dwellTime}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          item.status === "Active"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8" onClick={() => setSelectedItem(item)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                        {item.status === "Active" && (
                          <Button size="sm" variant="destructive" className="h-8" onClick={() => handleNeutralize(item)}>
                            <Shield className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="bg-black border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-cyber-green">Incident Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Full intelligence report for this event.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 font-mono text-sm mt-4">
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="col-span-2">{selectedItem.timestamp}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Trap:</span>
                <span className="col-span-2">{selectedItem.trap}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Attacker IP:</span>
                <span className="col-span-2">{selectedItem.ip}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-muted-foreground">User Agent:</span>
                <span className="col-span-2 truncate">{selectedItem.userAgent}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Dwell Time:</span>
                <span className="col-span-2">{selectedItem.dwellTime}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Status:</span>
                <span className="col-span-2">{selectedItem.status}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forensics;

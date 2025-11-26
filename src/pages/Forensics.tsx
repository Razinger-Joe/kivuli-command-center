import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Shield } from "lucide-react";

const forensicsData = [
  {
    timestamp: "2025-11-26 14:23:45",
    trap: "Budget_2025.pdf",
    ip: "197.156.240.12",
    userAgent: "Mozilla/5.0 (Windows NT 10.0)",
    dwellTime: "45s",
    status: "Active"
  },
  {
    timestamp: "2025-11-26 13:15:22",
    trap: "Staff_Salaries.xlsx",
    ip: "41.90.123.45",
    userAgent: "Chrome/119.0.0.0",
    dwellTime: "2m 15s",
    status: "Neutralized"
  },
  {
    timestamp: "2025-11-26 11:42:10",
    trap: "Intelligence_Report_Q4.docx",
    ip: "105.163.2.78",
    userAgent: "Firefox/120.0",
    dwellTime: "1m 30s",
    status: "Active"
  },
  {
    timestamp: "2025-11-25 16:55:33",
    trap: "Strategic_Plan_2026.pdf",
    ip: "197.232.15.90",
    userAgent: "Edge/119.0.0.0",
    dwellTime: "3m 12s",
    status: "Neutralized"
  },
];

const Forensics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-green mb-2">Forensics Reports</h1>
          <p className="text-muted-foreground">Intrusion activity analysis and threat intelligence</p>
        </div>
        <Button variant="outline" className="gap-2">
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
            />
          </div>
          <Button variant="outline">Filter</Button>
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
              {forensicsData.map((item, i) => (
                <TableRow 
                  key={i}
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
                      <Button size="sm" variant="outline" className="h-8">
                        <Eye className="w-3 h-3" />
                      </Button>
                      {item.status === "Active" && (
                        <Button size="sm" variant="destructive" className="h-8">
                          <Shield className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Forensics;

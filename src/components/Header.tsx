import { Bell, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="h-16 sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground font-mono">
          OPS CENTER / DASHBOARD
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 hover:bg-cyber-green/30">
          <div className="pulse-dot mr-2" />
          SYSTEMS OPERATIONAL
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        </div>
        
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>

        <Button 
          variant="destructive" 
          size="sm" 
          className="font-bold"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          LOCKDOWN
        </Button>
      </div>
    </header>
  );
};

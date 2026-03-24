import { Bell, User, AlertTriangle, Trash2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/Sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const initialNotifications = [
  { id: 1, message: "Unauthorized access blocked on node 4", time: "2 min ago", severity: "WARN" },
  { id: 2, message: "New decoy deployed to Kisumu grid", time: "1 hour ago", severity: "INFO" },
  { id: 3, message: "Multiple failed logins from 41.90.x.x", time: "3 hours ago", severity: "ALERT" }
];

const ROUTE_LABELS: Record<string, string> = {
  "/": "DASHBOARD",
  "/factory": "HONEYTOKEN FACTORY",
  "/sinkholes": "ACTIVE SINKHOLES",
  "/forensics": "FORENSICS REPORTS",
  "/settings": "SETTINGS"
};

export const Header = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications);

  const currentPageLabel = ROUTE_LABELS[location.pathname] || "DASHBOARD";

  const handleLockdown = () => {
    toast({ title: "LOCKDOWN INITIATED — All systems isolated.", variant: "destructive" });
  };
  return (
    <header className="h-16 sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-[#0a0a0a] border-white/10 w-64 text-white hover:text-white">
              <Sidebar className="w-full h-full border-r-0" />
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-sm text-muted-foreground font-mono uppercase truncate hidden sm:block">
          OPS CENTER / {currentPageLabel}
        </div>
      </div>

      <div className="flex items-center gap-2 hidden md:flex">
        <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 hover:bg-cyber-green/30">
          <div className="pulse-dot mr-2" />
          SYSTEMS OPERATIONAL
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-black border-white/10 text-white p-0">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h4 className="font-bold">Notifications</h4>
              <Button variant="ghost" size="sm" onClick={() => setNotifications([])} className="h-auto p-1 text-muted-foreground hover:text-white">
                <Trash2 className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">No new notifications</div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        notif.severity === 'ALERT' ? 'bg-red-500/20 text-red-500' : 
                        notif.severity === 'WARN' ? 'bg-amber-500/20 text-amber-500' : 
                        'bg-cyan-500/20 text-cyan-500'
                      }`}>
                        {notif.severity}
                      </span>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                    <p className="mt-2 text-sm">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              size="sm" 
              className="font-bold"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              LOCKDOWN
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black border-red-500/50 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500 flex items-center gap-2 text-xl">
                <AlertTriangle className="w-6 h-6" />
                CONFIRM SYSTEM LOCKDOWN
              </AlertDialogTitle>
              <AlertDialogDescription className="text-red-400">
                This will immediately isolate all monitored systems and suspend active decoys. This action cannot be undone without manual restart.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white font-bold" onClick={handleLockdown}>
                Confirm Lockdown
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
};

import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Factory, 
  Shield, 
  FileSearch, 
  Settings 
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Honeytoken Factory", url: "/factory", icon: Factory },
  { title: "Active Sinkholes", url: "/sinkholes", icon: Shield },
  { title: "Forensics Reports", url: "/forensics", icon: FileSearch },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <aside className={`w-60 bg-[#0a0a0a] border-r border-white/10 flex flex-col ${className || ''}`}>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-kenyan-gold rounded-full" />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-cyber-green">KIVULI</span>
          </h1>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          SOVEREIGN DECEPTION GRID
        </p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:bg-white/10 transition-all duration-200"
            activeClassName="bg-white/5 border-l-4 border-cyber-green text-cyber-green font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-cyber-green pulse-dot" />
          <span className="font-mono">SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </aside>
  );
};

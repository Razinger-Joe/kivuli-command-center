import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(`[KIVULI-SYS] Unauthorized or ghost route accessed: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/95 p-6">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 pulse-dot">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
        </div>
        <h1 className="text-6xl font-black text-white tracking-widest font-mono">
          4<span className="text-red-500">0</span>4
        </h1>
        <h2 className="text-2xl font-bold text-red-500 tracking-wider">
          SYSTEM FAULT
        </h2>
        <p className="text-muted-foreground/80 font-mono text-sm leading-relaxed border border-white/10 p-4 rounded bg-black/50">
          WARNING: The requested sector <span className="text-red-400 font-bold">"{location.pathname}"</span> does not exist in the Kivuli sovereign deception grid. This anomaly has been logged by the continuous monitoring system.
        </p>
        <div className="pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-transparent border border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10 px-6 py-3 rounded uppercase font-mono tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

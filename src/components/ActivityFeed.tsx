import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type LogLevel = "INFO" | "WARNING" | "ALERT";

interface LogEntry {
  time: string;
  level: LogLevel;
  message: string;
}

const initialLogs: LogEntry[] = [
  { time: "14:02:33", level: "INFO", message: 'Decoy file "Budget_2025.pdf" deployed' },
  { time: "14:05:12", level: "WARNING", message: "Suspicious access attempt from 197.156.x.x" },
  { time: "14:06:01", level: "ALERT", message: "Honeytoken triggered - Intrusion confirmed" },
  { time: "14:08:45", level: "INFO", message: "System scan completed - All systems normal" },
  { time: "14:12:20", level: "WARNING", message: "Multiple failed auth attempts detected" },
];

const logColors = {
  INFO: "text-cyan-400",
  WARNING: "text-amber-400",
  ALERT: "text-red-400",
};

export const ActivityFeed = () => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: Math.random() > 0.7 ? "WARNING" : "INFO",
        message: Math.random() > 0.5 
          ? "Network traffic analyzed - No threats detected"
          : "Perimeter scan in progress...",
      };
      setLogs(prev => [...prev.slice(-9), newLog]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollArea className="h-64">
      <div className="space-y-2 bg-black/80 rounded-lg p-4 font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className={`${logColors[log.level]} tracking-wide`}>
            <span className="text-muted-foreground">[{log.time}]</span> {log.level}: {log.message}
          </div>
        ))}
        <div className="text-cyber-green animate-pulse">_</div>
      </div>
    </ScrollArea>
  );
};

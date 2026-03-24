import { useEffect, useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type LogLevel = "INFO" | "WARNING" | "ALERT";

interface LogEntry {
  id: string;
  time: string;
  level: LogLevel;
  message: string;
}

const initialLogs: LogEntry[] = [
  { id: crypto.randomUUID(), time: "14:02:33", level: "INFO", message: 'Decoy file "Budget_2025.pdf" deployed' },
  { id: crypto.randomUUID(), time: "14:05:12", level: "WARNING", message: "Suspicious access attempt from 197.156.x.x" },
  { id: crypto.randomUUID(), time: "14:06:01", level: "ALERT", message: "Honeytoken triggered - Intrusion confirmed" },
  { id: crypto.randomUUID(), time: "14:08:45", level: "INFO", message: "System scan completed - All systems normal" },
  { id: crypto.randomUUID(), time: "14:12:20", level: "WARNING", message: "Multiple failed auth attempts detected" },
];

const logColors = {
  INFO: "text-cyan-400",
  WARNING: "text-amber-400",
  ALERT: "text-red-400",
};

const logPool = [
  { level: "INFO", message: "Nairobi perimeter scan completed" },
  { level: "INFO", message: "KE-CIRT/CC feed synchronized" },
  { level: "INFO", message: "Decoy file accessed from Mombasa zone" },
  { level: "WARNING", message: "Suspicious M-Pesa API probe from 41.90.x.x" },
  { level: "WARNING", message: "Brute force attempt on Nakuru node" },
  { level: "WARNING", message: "Unusual data exfil pattern detected" },
  { level: "ALERT", message: "Honeytoken triggered — Kisumu grid" },
  { level: "ALERT", message: "Sinkhole captured attacker 197.156.x.x" },
  { level: "ALERT", message: "Critical: Privilege escalation attempt blocked" },
];

export const ActivityFeed = () => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const interval = setInterval(() => {
      if (!isMounted.current) return;
      
      const rand = Math.random();
      let selectedPool = logPool.filter(l => l.level === "INFO");
      if (rand > 0.9) selectedPool = logPool.filter(l => l.level === "ALERT");
      else if (rand > 0.6) selectedPool = logPool.filter(l => l.level === "WARNING");
      
      const msg = selectedPool[Math.floor(Math.random() * selectedPool.length)];

      const newLog: LogEntry = {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: msg.level as LogLevel,
        message: msg.message,
      };
      setLogs(prev => [...prev.slice(-9), newLog]);
    }, 8000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <ScrollArea className="h-64">
      <div className="space-y-2 bg-black/80 rounded-lg p-4 font-mono text-sm">
        {logs.map((log) => (
          <div key={log.id} className={`${logColors[log.level]} tracking-wide`}>
            <span className="text-muted-foreground">[{log.time}]</span> {log.level}: {log.message}
          </div>
        ))}
        <div className="text-cyber-green animate-pulse">_</div>
      </div>
    </ScrollArea>
  );
};

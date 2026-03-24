export interface Sinkhole {
  id: string;
  name: string;
  status: "Active" | "Standby" | "Offline";
  captures: number;
  lastActivity: string;
}

export const sinkholesData: Sinkhole[] = [
  { id: "SH-001", name: "Decoy Server - Nairobi", status: "Active", captures: 12, lastActivity: "2 hours ago" },
  { id: "SH-002", name: "Honeypot Network - Mombasa", status: "Active", captures: 8, lastActivity: "45 minutes ago" },
  { id: "SH-003", name: "Trap Network - Kisumu", status: "Active", captures: 5, lastActivity: "3 hours ago" },
  { id: "SH-004", name: "Decoy Infrastructure - Nakuru", status: "Standby", captures: 3, lastActivity: "1 day ago" },
];

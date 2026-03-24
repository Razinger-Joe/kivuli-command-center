export interface ForensicsIncident {
  id: string;
  timestamp: string;
  trap: string;
  ip: string;
  userAgent: string;
  dwellTime: string;
  status: "Active" | "Neutralized";
}

export const forensicsData: ForensicsIncident[] = [
  { id: "FI-001", timestamp: "2025-11-26 14:23:45", trap: "Budget_2025.pdf", ip: "197.156.240.12", userAgent: "Mozilla/5.0 (Windows NT 10.0)", dwellTime: "45s", status: "Active" },
  { id: "FI-002", timestamp: "2025-11-26 13:15:22", trap: "Staff_Salaries.xlsx", ip: "41.90.123.45", userAgent: "Chrome/119.0.0.0", dwellTime: "2m 15s", status: "Neutralized" },
  { id: "FI-003", timestamp: "2025-11-26 11:42:10", trap: "Intelligence_Report_Q4.docx", ip: "105.163.2.78", userAgent: "Firefox/120.0", dwellTime: "1m 30s", status: "Active" },
  { id: "FI-004", timestamp: "2025-11-25 16:55:33", trap: "Strategic_Plan_2026.pdf", ip: "197.232.15.90", userAgent: "Edge/119.0.0.0", dwellTime: "3m 12s", status: "Neutralized" },
];

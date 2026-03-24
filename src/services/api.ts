import { ForensicsIncident, forensicsData } from "@/data/forensicsData";
import { Sinkhole, sinkholesData } from "@/data/sinkholes";

// Mock API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getForensics: async (): Promise<ForensicsIncident[]> => {
    await delay(800);
    return forensicsData;
  },
  
  getSinkholes: async (): Promise<Sinkhole[]> => {
    await delay(600);
    return sinkholesData;
  },

  deployDecoy: async (decoyData: Record<string, any>): Promise<{ success: boolean; message: string }> => {
    await delay(1200);
    return { success: true, message: `Decoy ${decoyData.fileName || 'file'} deployed successfully.` };
  }
};

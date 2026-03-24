import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, Mail, ChevronDown, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Factory = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [trapId, setTrapId] = useState("");
  const [fileName, setFileName] = useState("");
  const [decoyType, setDecoyType] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [selfDestruct, setSelfDestruct] = useState(false);
  const [days, setDays] = useState(30);
  const [deploying, setDeploying] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setEmailError(false);

    if (!fileName) {
      toast({ title: 'Missing file name', description: 'Please enter a decoy file name.', variant: 'destructive' });
      return;
    }
    if (!decoyType) {
      toast({ title: 'Missing type', description: 'Please select a decoy type.', variant: 'destructive' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!alertEmail || !emailRegex.test(alertEmail)) {
      setEmailError(true);
      toast({ title: 'Invalid email', description: 'Please enter a valid alert destination email.', variant: 'destructive' });
      return;
    }

    setIsGenerating(true);
    
    // Simulate trap generation with matrix effect
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTrapId = `TRAP_${decoyType.toUpperCase()}_${Date.now()}`;
    setTrapId(newTrapId);
    setIsGenerating(false);
    setShowSuccess(true);
    toast({ title: 'Trap generated', description: `Beacon ${newTrapId} is ready for deployment.` });
  };

  const handleDeploy = async () => {
    setDeploying(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: 'Trap Deployed', description: `Successfully deployed trap ${trapId} to shared drive.` });
    setDeploying(false);
    setShowSuccess(false);
    setFileName("");
    setDecoyType("");
    setAlertEmail("");
    setSelfDestruct(false);
    setDays(30);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyber-green mb-2">Honeytoken Factory</h1>
        <p className="text-muted-foreground">Generate deceptive assets to trap and identify intruders</p>
      </div>

      <Card className="glass-card p-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="filename" className="text-foreground mb-2 block">
              Decoy File Name
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="filename"
                placeholder="e.g., Staff_Salaries_2025.pdf"
                className="pl-10 bg-black/50 border-white/10 focus:border-cyber-green"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="decoytype" className="text-foreground mb-2 block">
              Decoy Type
            </Label>
            <Select value={decoyType} onValueChange={setDecoyType}>
              <SelectTrigger className="bg-black/50 border-white/10 focus:border-cyber-green">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                <SelectItem value="financial">💰 Financial Records</SelectItem>
                <SelectItem value="hr">👥 HR/Personnel Data</SelectItem>
                <SelectItem value="intel">🔒 Intelligence Reports</SelectItem>
                <SelectItem value="strategic">📋 Strategic Plans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground mb-2 block">
              Alert Destination
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="security@niru.go.ke"
                className={`pl-10 bg-black/50 focus:border-cyber-green ${emailError ? 'border-red-500' : 'border-white/10'}`}
                value={alertEmail}
                onChange={(e) => {
                  setAlertEmail(e.target.value);
                  if (emailError) setEmailError(false);
                }}
              />
            </div>
          </div>

          <Collapsible className="border border-white/10 rounded-lg p-4 bg-black/30">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <span className="font-medium">Advanced Options</span>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="selfDestruct">Self-Destruct Timer</Label>
                <Switch id="selfDestruct" checked={selfDestruct} onCheckedChange={setSelfDestruct} />
              </div>
              <div>
                <Label htmlFor="days">Days until auto-delete</Label>
                <Input
                  id="days"
                  type="number"
                  defaultValue="30"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="mt-2 bg-black/50 border-white/10"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-green-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                GENERATING TRAP...
              </>
            ) : (
              "GENERATE TRAP"
            )}
          </Button>
        </div>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-card border-cyber-green/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-cyber-green text-2xl">
              <CheckCircle className="w-6 h-6" />
              TRAP DEPLOYED
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-black/50 rounded-lg font-mono text-sm space-y-2">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Beacon ID:</span>
                <span className="col-span-2 text-cyber-green font-bold">{trapId}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">File Name:</span>
                <span className="col-span-2">{fileName}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Type:</span>
                <span className="col-span-2">{decoyType}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleDeploy} disabled={deploying}>
                {deploying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Deploy to Shared Drive
              </Button>
              <Button variant="outline" onClick={() => setShowSuccess(false)} disabled={deploying}>
                Generate Another
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Factory;

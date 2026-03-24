import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const Settings = () => {
  const { toast } = useToast();
  const [timezone, setTimezone] = useState("eat");
  const [language, setLanguage] = useState("en");
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  
  const [apiKey, setApiKey] = useState("kv_live_sk_8f7b92c4d9e01a2b3c4");
  const [showKey, setShowKey] = useState(false);
  const [isTestingSlack, setIsTestingSlack] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kivuli-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimezone(parsed.timezone || "eat");
        setLanguage(parsed.language || "en");
        setEmailAlerts(parsed.emailAlerts || false);
        setSlackWebhook(parsed.slackWebhook || "");
        setTwoFactor(parsed.twoFactor || false);
        if (parsed.apiKey) setApiKey(parsed.apiKey);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const handleSave = () => {
    if (slackWebhook && !slackWebhook.startsWith('https://hooks.slack.com/')) {
      toast({ title: "Invalid Webhook", description: "Slack webhook must start with https://hooks.slack.com/", variant: "destructive" });
      return;
    }

    localStorage.setItem("kivuli-settings", JSON.stringify({
      timezone, language, emailAlerts, slackWebhook, twoFactor, apiKey
    }));
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  const testWebhook = async () => {
    if (!slackWebhook.startsWith('https://hooks.slack.com/')) {
      toast({ title: "Invalid Webhook", description: "Save a valid Slack webhook before testing.", variant: "destructive" });
      return;
    }
    setIsTestingSlack(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsTestingSlack(false);
    toast({ title: "Test Successful", description: "Webhook endpoint reached successfully." });
  };

  const regenerateKey = () => {
    const newKey = `kv_live_sk_${crypto.randomUUID().replace(/-/g, '')}`;
    setApiKey(newKey);
    toast({ title: "API Key Regenerated", description: "Make sure to update your integrations." });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyber-green mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and integrations</p>
      </div>

      <Card className="glass-card">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start border-b border-white/10 rounded-none bg-transparent p-0">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-cyber-green rounded-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-cyber-green rounded-none"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="data-[state=active]:border-b-2 data-[state=active]:border-cyber-green rounded-none"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="integrations"
              className="data-[state=active]:border-b-2 data-[state=active]:border-cyber-green rounded-none"
            >
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="p-6 space-y-6">
            <div>
              <Label htmlFor="timezone">System Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="mt-2 bg-black/50 border-white/10">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="mt-2 bg-black/50 border-white/10">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch />
            </div>

            <div>
              <Label htmlFor="slack">Slack Webhook URL</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="slack"
                  placeholder="https://hooks.slack.com/..."
                  className="bg-black/50 border-white/10 flex-1"
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                />
                <Button variant="outline" onClick={testWebhook} disabled={isTestingSlack}>
                  {isTestingSlack ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Test Webhook
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>

            <div>
              <Label>API Key Management</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-4 bg-black/50 border border-white/10 rounded-lg font-mono text-sm tracking-widest break-all">
                  {showKey ? apiKey : "•".repeat(32)}
                </div>
                <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </Button>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="mt-4 text-red-500 hover:text-red-400 hover:bg-red-950">Regenerate Key</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black border-red-500/50 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">Regenerate API Key?</AlertDialogTitle>
                    <AlertDialogDescription className="text-red-400">
                      Regenerating the API key will immediately invalidate the current key and break any active integrations.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white font-bold" onClick={regenerateKey}>
                      Regenerate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="p-6 space-y-6">
            <div>
              <Label>SIEM Integration</Label>
              <p className="text-sm text-muted-foreground mb-3">Connect to external security systems</p>
              <Button variant="outline">Configure SIEM</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-cyber-green text-black hover:bg-cyber-green/90" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;

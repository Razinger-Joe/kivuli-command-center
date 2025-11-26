import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
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
              <Select>
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
              <Select>
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
              <Input
                id="slack"
                placeholder="https://hooks.slack.com/..."
                className="mt-2 bg-black/50 border-white/10"
              />
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
              <div className="mt-2 p-4 bg-black/50 border border-white/10 rounded-lg font-mono text-sm">
                ••••••••••••••••••••••••••••••••
              </div>
              <Button variant="outline" className="mt-2">Regenerate Key</Button>
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
        <Button className="bg-cyber-green text-black hover:bg-cyber-green/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;

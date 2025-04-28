
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const SettingsTab = () => {
  const [emailSettings, setEmailSettings] = useState({
    dailyDigest: true,
    weeklyReport: true,
    criticalAlerts: true,
    marketingEmails: false
  });

  const handleEmailSettingChange = (setting: keyof typeof emailSettings) => {
    setEmailSettings({
      ...emailSettings,
      [setting]: !emailSettings[setting]
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Configure general site settings for the admin dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="DentalDeals Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" defaultValue="https://admin.dentaldeals.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" defaultValue="admin@dentaldeals.com" type="email" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, the site will show a maintenance message to regular users.
                </p>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure timezone and currency settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                  <option>(GMT-07:00) Mountain Time (US & Canada)</option>
                  <option>(GMT-06:00) Central Time (US & Canada)</option>
                  <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                  <option>(GMT) Greenwich Mean Time</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>CAD ($)</option>
                  <option>AUD ($)</option>
                </select>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure what emails you receive from the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <Checkbox 
                    id="daily-digest" 
                    checked={emailSettings.dailyDigest} 
                    onCheckedChange={() => handleEmailSettingChange('dailyDigest')} 
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="daily-digest">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of all platform activities.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <Checkbox 
                    id="weekly-report" 
                    checked={emailSettings.weeklyReport} 
                    onCheckedChange={() => handleEmailSettingChange('weeklyReport')} 
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="weekly-report">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly performance and analytics report.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <Checkbox 
                    id="critical-alerts" 
                    checked={emailSettings.criticalAlerts} 
                    onCheckedChange={() => handleEmailSettingChange('criticalAlerts')} 
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="critical-alerts">Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about security events and critical issues.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <Checkbox 
                    id="marketing-emails" 
                    checked={emailSettings.marketingEmails} 
                    onCheckedChange={() => handleEmailSettingChange('marketingEmails')} 
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing updates and newsletters.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure your account security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button>Update Password</Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <span>Enhance your account security with 2FA.</span>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <div className="space-y-2">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Last active: Just now</p>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Active
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for external integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">Production API Key</p>
                    <p className="text-sm text-muted-foreground">Last used: 2 days ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reveal Key</Button>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">Development API Key</p>
                    <p className="text-sm text-muted-foreground">Last used: 5 hours ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reveal Key</Button>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                </div>
              </div>
              
              <Button>Create New API Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTab;

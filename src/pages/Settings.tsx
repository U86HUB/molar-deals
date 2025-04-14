
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Settings saved successfully!");
      setLoading(false);
    }, 1000);
  };
  
  const handleGenerateLink = () => {
    navigator.clipboard.writeText("https://dentaldeal.com/invite/ABC123");
    toast.success("Referral link copied to clipboard!");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and information
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-0">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                orientation="vertical"
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto w-full rounded-none space-y-1 bg-transparent">
                  <TabsTrigger
                    value="profile"
                    className="justify-start py-3 px-4 text-left"
                  >
                    Profile Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="justify-start py-3 px-4 text-left"
                  >
                    Account Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start py-3 px-4 text-left"
                  >
                    Notification Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="referrals"
                    className="justify-start py-3 px-4 text-left"
                  >
                    Referrals
                  </TabsTrigger>
                  <TabsTrigger
                    value="subscription"
                    className="justify-start py-3 px-4 text-left"
                  >
                    Subscription
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Content area */}
          <Card className="lg:col-span-3">
            <TabsContent value="profile" className="m-0">
              <CardHeader>
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-muted-foreground">
                  Update your personal information and how it appears to others
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div>
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback className="text-3xl">JD</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      This photo will be displayed on your profile and in comments.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="secondary" size="sm">
                        Upload New Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Dr. Jane Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="jane.doe@example.com" readOnly />
                    <p className="text-xs text-muted-foreground">
                      Your email cannot be changed
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="practice">Practice Name</Label>
                    <Input id="practice" defaultValue="Doe Dental Clinic" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select defaultValue="General Dentist">
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Dentist">General Dentist</SelectItem>
                        <SelectItem value="Orthodontist">Orthodontist</SelectItem>
                        <SelectItem value="Endodontist">Endodontist</SelectItem>
                        <SelectItem value="Periodontist">Periodontist</SelectItem>
                        <SelectItem value="Prosthodontist">Prosthodontist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="General dentist with over 10 years of experience, specializing in cosmetic dentistry and Invisalign. Passionate about providing comfortable and comprehensive dental care."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description of your professional background and interests.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="primary" onClick={handleSave} loading={loading}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="referrals" className="m-0">
              <CardHeader>
                <h2 className="text-xl font-semibold">Referral Program</h2>
                <p className="text-muted-foreground">
                  Invite colleagues and earn rewards when they sign up
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="bg-secondary/50 border-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg">Your Referrals</h3>
                        <p className="text-muted-foreground">
                          You've invited 3 colleagues so far
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold">3</p>
                          <p className="text-sm text-muted-foreground">Invites Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold">2</p>
                          <p className="text-sm text-muted-foreground">Signed Up</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-success">$20</p>
                          <p className="text-sm text-muted-foreground">Earned</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Share Your Referral Link</h3>
                  <div className="flex items-center gap-2">
                    <Input 
                      value="https://dentaldeal.com/invite/ABC123"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" onClick={handleGenerateLink}>
                      <Link className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For each successful referral, both you and your colleague will receive a $10 credit.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Referral Statistics</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Name</th>
                        <th className="text-left py-2 font-medium">Date</th>
                        <th className="text-left py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Dr. Robert Smith</td>
                        <td className="py-3">Apr 5, 2025</td>
                        <td className="py-3">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Dr. Maria Garcia</td>
                        <td className="py-3">Apr 2, 2025</td>
                        <td className="py-3">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Dr. James Wilson</td>
                        <td className="py-3">Mar 28, 2025</td>
                        <td className="py-3">
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="notifications" className="m-0">
              <CardHeader>
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <p className="text-muted-foreground">
                  Control how and when you receive updates
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Deals</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails when new deals are added
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Deal Expiration</p>
                        <p className="text-sm text-muted-foreground">
                          Get reminders before deals you've saved expire
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Learn about new features and improvements
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing & Promotions</p>
                        <p className="text-sm text-muted-foreground">
                          Receive offers, surveys, and promotional content
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="primary" onClick={handleSave} loading={loading}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="subscription" className="m-0">
              <CardHeader>
                <h2 className="text-xl font-semibold">Subscription Management</h2>
                <p className="text-muted-foreground">
                  View and manage your subscription plan
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/50 rounded-lg p-6 border border-secondary">
                  <h3 className="text-xl font-medium mb-2">Free Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    Basic access to dental deals
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Access to regular deals
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Basic dashboard features
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Premium deals locked
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Early access to new deals
                    </li>
                  </ul>
                  <Button variant="success" className="w-full">
                    Upgrade to Premium
                  </Button>
                </div>
                
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-medium">Premium Plan Benefits</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Access to all deals, including premium offers
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Early access to new deals before others
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Exclusive webinars and educational content
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Priority customer support
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        2x referral bonuses
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">
                      Premium plan starts at $19.99/month. Cancel anytime.
                    </p>
                  </CardContent>
                </Card>
                
              </CardContent>
            </TabsContent>
            
            <TabsContent value="account" className="m-0">
              <CardHeader>
                <h2 className="text-xl font-semibold">Account Settings</h2>
                <p className="text-muted-foreground">
                  Manage your account security and preferences
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-medium">Change Password</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll send a password reset link to your email
                  </p>
                  <Button variant="outline">Send Reset Link</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-base font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </TabsContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

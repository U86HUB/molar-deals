
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, CalendarIcon, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

interface VendorCreateDealFormProps {
  onClose: () => void;
}

export const VendorCreateDealForm = ({ onClose }: VendorCreateDealFormProps) => {
  const [date, setDate] = useState<Date>();
  const [makePremium, setMakePremium] = useState(false);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Deal submitted for review");
    onClose();
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Create New Deal</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dealTitle">Deal Title</Label>
            <Input 
              id="dealTitle" 
              placeholder="Enter a catchy title for your deal" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="materials">Dental Materials</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="patient-care">Patient Care Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Deal Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe your deal in detail" 
            required
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="url">Deal URL</Label>
            <Input 
              id="url" 
              placeholder="https://example.com/your-deal" 
              type="url"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="expiryDate"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => 
                    date < new Date() || 
                    date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="discountValue">Discount Value</Label>
            <Input 
              id="discountValue" 
              placeholder="e.g. 20% or BOGO" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Target Location</Label>
            <Select defaultValue="GLOBAL">
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GLOBAL">Global (All Locations)</SelectItem>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="CAN">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="AUS">Australia</SelectItem>
                <SelectItem value="DEU">Germany</SelectItem>
                <SelectItem value="FRA">France</SelectItem>
                <SelectItem value="ESP">Spain</SelectItem>
                <SelectItem value="ITA">Italy</SelectItem>
                <SelectItem value="JPN">Japan</SelectItem>
                <SelectItem value="BRA">Brazil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Label htmlFor="makePremium" className="mr-2">Make Premium Deal</Label>
              <div className="relative group">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-2 bg-background border rounded-md shadow-md text-xs hidden group-hover:block z-50">
                  Premium deals are highlighted and shown to premium users first. They typically get 2.5x more engagement.
                </div>
              </div>
            </div>
            <Switch id="makePremium" checked={makePremium} onCheckedChange={setMakePremium} />
          </div>
          <p className="text-xs text-muted-foreground">
            Premium deals are featured prominently and typically get more engagement
          </p>
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit Deal for Review</Button>
        </div>
      </form>
    </div>
  );
};

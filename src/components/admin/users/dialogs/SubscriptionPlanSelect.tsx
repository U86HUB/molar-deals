
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubscriptionPlanSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const SubscriptionPlanSelect = ({ value, onValueChange }: SubscriptionPlanSelectProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="subscription">Subscription Plan</Label>
      <Select 
        value={value} 
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Free">Free</SelectItem>
          <SelectItem value="Basic">Basic</SelectItem>
          <SelectItem value="Premium">Premium</SelectItem>
          <SelectItem value="Enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

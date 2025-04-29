
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { userService, UserProfile, UserRole, UserStatus } from "@/services/userService";
import { toast } from "sonner";
import { DialogHeader } from "./users/dialogs/DialogHeader";
import { DialogFooter } from "./users/dialogs/DialogFooter";
import { UserFormContent } from "./users/dialogs/UserFormContent";

interface UserEditDialogProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export const UserEditDialog = ({ userId, isOpen, onClose, onUserUpdated }: UserEditDialogProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("Dentist");
  const [status, setStatus] = useState<UserStatus>("Active");
  const [location, setLocation] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("Free");
  
  // Load user data when dialog opens
  useEffect(() => {
    if (isOpen && userId) {
      loadUserData(userId);
    } else {
      resetForm();
    }
  }, [isOpen, userId]);

  const loadUserData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userService.getUserById(id);
      
      if (userData) {
        setUser(userData);
        // Initialize form values
        setName(userData.name || "");
        setRole(userData.role || "Dentist");
        setStatus(userData.status || "Active");
        setLocation(userData.location || "");
        setSubscriptionPlan(userData.subscriptionPlan || "Free");
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUser(null);
    setName("");
    setRole("Dentist");
    setStatus("Active");
    setLocation("");
    setSubscriptionPlan("Free");
    setError(null);
  };

  const handleSave = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      
      // Update user profile
      await userService.updateUserProfile(userId, {
        name,
        role,
        location,
        subscriptionPlan
      });
      
      // Update user status if changed
      if (user?.status !== status) {
        await userService.updateUserStatus(userId, status);
      }
      
      toast.success("User updated successfully");
      onUserUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader 
          title="Edit User" 
          description="Make changes to the user profile below. Click save when you're done."
        />

        <UserFormContent 
          user={user}
          loading={loading}
          error={error}
          name={name}
          setName={setName}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
          location={location}
          setLocation={setLocation}
          subscriptionPlan={subscriptionPlan}
          setSubscriptionPlan={setSubscriptionPlan}
        />

        <DialogFooter 
          onCancel={onClose}
          onSave={handleSave}
          loading={loading}
          disabled={!user}
        />
      </DialogContent>
    </Dialog>
  );
};

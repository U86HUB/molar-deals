
import React from "react";
import { DialogFooter as UIDialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DialogFooterProps {
  onCancel: () => void;
  onSave: () => void;
  loading: boolean;
  disabled: boolean;
}

export const DialogFooter = ({ onCancel, onSave, loading, disabled }: DialogFooterProps) => {
  return (
    <UIDialogFooter>
      <Button variant="outline" onClick={onCancel} disabled={loading}>
        Cancel
      </Button>
      <Button onClick={onSave} disabled={loading || disabled}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </UIDialogFooter>
  );
};


import React from "react";
import { DialogHeader as UIDialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface DialogHeaderProps {
  title: string;
  description: string;
}

export const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  return (
    <UIDialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </UIDialogHeader>
  );
};

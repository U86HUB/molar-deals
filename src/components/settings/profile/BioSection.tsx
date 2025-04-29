
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BioSectionProps {
  bio: string;
  onChange: (bio: string) => void;
}

export const BioSection = ({ bio, onChange }: BioSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="bio">Professional Bio</Label>
      <Textarea
        id="bio"
        value={bio}
        onChange={e => onChange(e.target.value)}
        rows={4}
      />
      <p className="text-xs text-muted-foreground">
        Brief description of your professional background and interests.
      </p>
    </div>
  );
};

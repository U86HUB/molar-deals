
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface PhotoUploadSectionProps {
  name: string;
}

export const PhotoUploadSection = ({ name }: PhotoUploadSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div>
        <Avatar className="h-24 w-24">
          <AvatarImage src="" alt="Profile" />
          <AvatarFallback className="text-3xl">
            {name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || "?"}
          </AvatarFallback>
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
  );
};

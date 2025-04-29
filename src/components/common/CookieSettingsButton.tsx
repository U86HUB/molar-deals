
import { Button, ButtonProps } from "@/components/ui/button";
import { useCookieSettings } from "@/context/CookieSettingsContext";

export const CookieSettingsButton = (props: ButtonProps) => {
  const { openCookieSettings } = useCookieSettings();

  return (
    <Button 
      onClick={openCookieSettings} 
      variant="link"
      className="p-0 h-auto text-muted-foreground hover:text-foreground"
      {...props}
    >
      Cookie Settings
    </Button>
  );
};

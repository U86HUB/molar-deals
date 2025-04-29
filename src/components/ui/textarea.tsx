
import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  
  // Merge refs to handle both forwarded ref and local ref
  const handleRef = (textareaElement: HTMLTextAreaElement | null) => {
    textareaRef.current = textareaElement;
    if (typeof ref === "function") {
      ref(textareaElement);
    } else if (ref) {
      ref.current = textareaElement;
    }
  };
  
  // Auto-resize function
  const handleResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to get the correct scrollHeight
    textarea.style.height = "auto";
    
    // Set new height based on scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  
  // Adjust height on input changes
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Initial resize
    handleResize();
    
    // Add event listeners
    textarea.addEventListener("input", handleResize);
    
    // Cleanup
    return () => {
      textarea.removeEventListener("input", handleResize);
    };
  }, []);
  
  return (
    <textarea
      className={cn(
        "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={handleRef}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

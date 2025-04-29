
import { toast } from "sonner";

// Function to check if a password has been compromised using the HaveIBeenPwned API
export async function checkPasswordLeak(password: string): Promise<boolean> {
  try {
    // Create SHA-1 hash of the password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    
    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Use k-anonymity model - only send first 5 chars of the hash
    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5).toUpperCase();
    
    // Call the HaveIBeenPwned API with the prefix
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    
    if (!response.ok) {
      console.error('Error checking password leak status:', response.statusText);
      return false; // Fail open if the API is down
    }
    
    const text = await response.text();
    const hashes = text.split('\n');
    
    // Check if our hash suffix exists in the response
    for (const hash of hashes) {
      const [hashSuffix, count] = hash.split(':');
      if (hashSuffix === suffix) {
        return true; // Password has been leaked
      }
    }
    
    return false; // Password not found in leaks
  } catch (error) {
    console.error('Error checking password leak:', error);
    return false; // Fail open on error
  }
}

// Password strength criteria
export function validatePasswordStrength(password: string): {
  isStrong: boolean;
  message: string;
} {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (password.length < minLength) {
    return {
      isStrong: false,
      message: `Password must be at least ${minLength} characters long`,
    };
  }
  
  // Count the number of criteria met
  const criteriaCount = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars]
    .filter(Boolean).length;
  
  if (criteriaCount < 3) {
    return {
      isStrong: false,
      message: "Password should include at least 3 of the following: uppercase letters, lowercase letters, numbers, and special characters",
    };
  }
  
  return {
    isStrong: true,
    message: "Password strength is good",
  };
}

// Enhanced password validation combining both strength and leak checks
export async function validatePassword(password: string): Promise<boolean> {
  // First check password strength
  const strengthResult = validatePasswordStrength(password);
  
  if (!strengthResult.isStrong) {
    toast.error(strengthResult.message);
    return false;
  }
  
  // Then check if password has been compromised
  const isLeaked = await checkPasswordLeak(password);
  
  if (isLeaked) {
    toast.error("This password has been found in data breaches. Please choose another password.");
    return false;
  }
  
  return true;
}


import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const requirements = [
    {
      id: "length",
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      id: "uppercase",
      label: "Contains uppercase letters (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "Contains lowercase letters (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "Contains numbers (0-9)",
      valid: /\d/.test(password),
    },
    {
      id: "special",
      label: "Contains special characters (!@#$...)",
      valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];

  const validCount = requirements.filter(req => req.valid).length;
  const strengthLevel = validCount <= 2 ? "weak" : validCount <= 3 ? "medium" : "strong";
  const strengthColor = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500",
  };

  return (
    <div className="mt-2 space-y-3">
      <div className="space-y-1">
        <div className="text-sm text-gray-500">Password strength</div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              strengthColor[strengthLevel as keyof typeof strengthColor]
            )}
            style={{ width: `${(validCount / requirements.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="space-y-1 text-sm">
        {requirements.map((req) => (
          <li key={req.id} className="flex items-center gap-2">
            {req.valid ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-300" />
            )}
            <span className={cn(
              req.valid ? "text-green-600" : "text-gray-500"
            )}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
      
      <div className="text-sm text-amber-600 mt-2">
        <p>For better security, we'll check if your password has been exposed in data breaches.</p>
      </div>
    </div>
  );
};

export default PasswordRequirements;

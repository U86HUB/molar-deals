
export const CheckBadge = () => (
  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
    <Check className="h-3 w-3 text-green-600" />
  </div>
);

// Small Check icon component
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

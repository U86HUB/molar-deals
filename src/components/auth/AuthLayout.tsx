
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">DD</span>
          </div>
          <h1 className="text-3xl font-bold">DentalDeals</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access exclusive dental deals
          </p>
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

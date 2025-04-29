
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useIndexPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isAuthenticated, user, session, hasCompletedOnboarding } = useAuth();
  const navigate = useNavigate();

  // Check if user needs onboarding when auth state changes
  useEffect(() => {
    if (isAuthenticated && user && session) {
      // Check if user has completed onboarding (from metadata)
      if (hasCompletedOnboarding === false) {
        // Show onboarding if not completed
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
    } else {
      // If not authenticated, make sure onboarding is hidden
      setShowOnboarding(false);
    }
  }, [isAuthenticated, user, session, hasCompletedOnboarding]);

  const handleAuthSuccess = () => {
    // We'll show onboarding after auth callback handles
    // the user session and redirects back to here
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate("/dashboard");
  };
  
  const handleHowItWorksClick = () => {
    navigate("/how-it-works");
  };

  return {
    showAuthModal,
    setShowAuthModal,
    showOnboarding,
    setShowOnboarding,
    isAuthenticated,
    handleAuthSuccess,
    handleOnboardingComplete,
    handleHowItWorksClick,
  };
};

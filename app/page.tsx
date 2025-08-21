
"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
  useNotification,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback } from "react";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./components/Dashboard";
import { WorkoutSession } from "./components/WorkoutSession";
import { ProgressView } from "./components/ProgressView";
import { OnboardingFlow } from "./components/OnboardingFlow";

export default function FitFlowApp() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'workout' | 'progress'>('onboarding');
  const [user, setUser] = useState<any>(null);
  const [currentWorkout, setCurrentWorkout] = useState<any>(null);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Mock user data - in production this would come from your backend
  useEffect(() => {
    // Simulate user loading
    const mockUser = {
      id: "user123",
      farcasterHandle: "@fitfan",
      fitnessGoals: ["lose_weight", "build_muscle"],
      subscriptionStatus: "premium",
      onboardingComplete: false,
    };
    setUser(mockUser);
  }, []);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    if (result) {
      setFrameAdded(true);
      await sendNotification({
        title: "FitFlow Coach Ready! 💪",
        body: "Your AI fitness coach is now active. Let's crush those goals!"
      });
    }
  }, [addFrame, sendNotification]);

  const startWorkout = useCallback(() => {
    const mockWorkout = {
      id: "workout123",
      name: "Upper Body Strength",
      exercises: [
        { name: "Push-ups", sets: 3, reps: 12 },
        { name: "Pull-ups", sets: 3, reps: 8 },
        { name: "Dips", sets: 3, reps: 10 },
      ],
    };
    setCurrentWorkout(mockWorkout);
    setCurrentView('workout');
  }, []);

  // Primary button logic
  usePrimaryButton(
    { text: currentView === 'dashboard' ? 'Start Workout' : 
             currentView === 'workout' ? 'Complete Workout' :
             currentView === 'progress' ? 'New Workout' : 'Get Started' },
    () => {
      if (currentView === 'onboarding') {
        setCurrentView('dashboard');
        setUser(prev => ({ ...prev, onboardingComplete: true }));
      } else if (currentView === 'dashboard') {
        startWorkout();
      } else if (currentView === 'workout') {
        setCurrentView('dashboard');
        setCurrentWorkout(null);
        // Send completion notification
        sendNotification({
          title: "Workout Complete! 🎉",
          body: "Great job! Your progress has been logged."
        });
      } else if (currentView === 'progress') {
        startWorkout();
      }
    }
  );

  const handleCompleteOnboarding = useCallback((goals: string[]) => {
    setUser(prev => ({
      ...prev,
      fitnessGoals: goals,
      onboardingComplete: true,
    }));
    setCurrentView('dashboard');
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AppShell
      user={user}
      frameAdded={frameAdded}
      onAddFrame={handleAddFrame}
      onNavigate={setCurrentView}
      currentView={currentView}
    >
      {currentView === 'onboarding' && !user.onboardingComplete && (
        <OnboardingFlow onComplete={handleCompleteOnboarding} />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard
          user={user}
          onStartWorkout={startWorkout}
          onViewProgress={() => setCurrentView('progress')}
        />
      )}
      
      {currentView === 'workout' && currentWorkout && (
        <WorkoutSession
          workout={currentWorkout}
          onComplete={() => {
            setCurrentView('dashboard');
            setCurrentWorkout(null);
          }}
        />
      )}
      
      {currentView === 'progress' && (
        <ProgressView
          user={user}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </AppShell>
  );
}

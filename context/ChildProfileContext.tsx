import { createContext, ReactNode, useContext, useState } from "react";
import { Child, ChildProfile } from "../types/child.types";

interface ChildProfileContextType {
  childProfile: Partial<ChildProfile>;
  updateChild: (child: Partial<Child>) => void;
  updateChallenges: (challenges: string[]) => void;
  updateGoals: (goals: string[]) => void;
  resetProfile: () => void;
  getCompleteProfile: () => ChildProfile | null;
}

const ChildProfileContext = createContext<ChildProfileContextType | undefined>(undefined);

export function ChildProfileProvider({ children }: { children: ReactNode }) {
  const [childProfile, setChildProfile] = useState<Partial<ChildProfile>>({
    child: {
      id: "",
      name: "",
      age: 0,
      gender: "",
    },
    challenges: [],
    goals: [],
  });

  const updateChild = (child: Partial<Child>) => {
    setChildProfile((prev: Partial<ChildProfile>) => ({
      ...prev,
      child: { ...prev.child, ...child } as Child,
    }));
  };

  const updateChallenges = (challenges: string[]) => {
    setChildProfile((prev: Partial<ChildProfile>) => ({
      ...prev,
      challenges,
    }));
  };

  const updateGoals = (goals: string[]) => {
    setChildProfile((prev: Partial<ChildProfile>) => ({
      ...prev,
      goals,
    }));
  };

  const resetProfile = () => {
    setChildProfile({
      child: {
        id: "",
        name: "",
        age: 0,
        gender: "",
      },
      challenges: [],
      goals: [],
    });
  };

  const getCompleteProfile = (): ChildProfile | null => {
    if (
      childProfile.child?.name &&
      childProfile.child?.age &&
      childProfile.child?.gender &&
      childProfile.challenges &&
      childProfile.goals
    ) {
      return {
        child: childProfile.child as Child,
        challenges: childProfile.challenges,
        goals: childProfile.goals,
      };
    }
    return null;
  };

  return (
    <ChildProfileContext.Provider
      value={{
        childProfile,
        updateChild,
        updateChallenges,
        updateGoals,
        resetProfile,
        getCompleteProfile,
      }}
    >
      {children}
    </ChildProfileContext.Provider>
  );
}

export function useChildProfile() {
  const context = useContext(ChildProfileContext);
  if (context === undefined) {
    throw new Error("useChildProfile must be used within a ChildProfileProvider");
  }
  return context;
}

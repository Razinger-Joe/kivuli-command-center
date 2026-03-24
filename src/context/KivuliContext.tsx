import React, { createContext, useContext, useReducer, ReactNode } from "react";

type KivuliState = {
  isLockdown: boolean;
  activeAlerts: number;
};

type Action = 
  | { type: "TOGGLE_LOCKDOWN" }
  | { type: "SET_ALERTS"; payload: number };

const initialState: KivuliState = {
  isLockdown: false,
  activeAlerts: 3,
};

const KivuliContext = createContext<{ state: KivuliState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const KivuliProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer((state: KivuliState, action: Action) => {
    switch (action.type) {
      case "TOGGLE_LOCKDOWN":
        return { ...state, isLockdown: !state.isLockdown };
      case "SET_ALERTS":
        return { ...state, activeAlerts: action.payload };
      default:
        return state;
    }
  }, initialState);

  return <KivuliContext.Provider value={{ state, dispatch }}>{children}</KivuliContext.Provider>;
};

export const useKivuli = () => {
  const context = useContext(KivuliContext);
  if (!context) throw new Error("useKivuli must be used within KivuliProvider");
  return context;
};

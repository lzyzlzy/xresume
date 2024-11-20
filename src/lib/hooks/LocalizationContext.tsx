import { Localization } from "@/core/Localization";
import ReduceAction from "@/core/ReduceAction";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { cnLocalization, enLocalization } from "../data/enLocalization";

const defaultLocalization = enLocalization;

export const LocalizationContext =
  createContext<Localization>(defaultLocalization);
export const LocalizationDispatchContext = createContext<
  React.Dispatch<ReduceAction>
>({} as React.Dispatch<ReduceAction>);

interface LocalizationProviderProps {
  children: ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [data, dispatch] = useReducer(localizationReducer, defaultLocalization);

  return (
    <LocalizationContext.Provider value={data}>
      <LocalizationDispatchContext.Provider value={dispatch}>
        {children}
      </LocalizationDispatchContext.Provider>
    </LocalizationContext.Provider>
  );
}

export function UseLocalization(): Localization {
  return useContext(LocalizationContext);
}

export function UseLocalizationDispatch() {
  return useContext(LocalizationDispatchContext);
}

const localizationStore = new Map([
  ["en", enLocalization],
  ["cn", cnLocalization],
]);

function localizationReducer(
  state: Localization,
  action: ReduceAction
): Localization {
  switch (action.type) {
    case "changeLocalization": {
      const key = action.data as string;

      const newLocalization = localizationStore.get(key);

      return { ...(newLocalization ?? state) };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
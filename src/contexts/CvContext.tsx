import { createContext, useReducer, ReactNode } from "react";
import { Cv, CvEvent } from "@/core/CV";

export const CvContext = createContext<Cv | null>(null);
export const CvDispatchContext = createContext<React.Dispatch<CvReduceAction>>(
  {} as React.Dispatch<CvReduceAction>
);

interface CvProviderProps {
  children: ReactNode;
}

export function CvProvider({ children }: CvProviderProps) {
  const [data, dispatch] = useReducer(cvReducer, {} as Cv);

  return (
    <CvContext.Provider value={data}>
      <CvDispatchContext.Provider value={dispatch}>
        {children}
      </CvDispatchContext.Provider>
    </CvContext.Provider>
  );
}

interface CvReduceAction {
  type: string;
  data?: any;
}

function cvReducer(state: Cv, action: CvReduceAction): Cv {
  switch (action.type) {
    case "setName": {
      return { ...state, name: action.data };
    }
    case "setEmail": {
      return { ...state, email: action.data };
    }
    case "setJobTitle": {
      return { ...state, jobTitle: action.data };
    }
    case "setPhoneNumber": {
      return { ...state, phoneNumber: action.data };
    }
    case "setWebsite": {
      return { ...state, website: action.data };
    }
    case "setGithub": {
      return { ...state, github: action.data };
    }
    case "setBirth": {
      return { ...state, birthday: action.data };
    }
    case "addEducation": {
      return {
        ...state,
        educations: [
          ...(state?.educations ?? []),
          action.data ?? ({} as CvEvent),
        ],
      };
    }
    case "updateEducationItem": {
      if (!state.educations) {
        return { ...state };
      }
      const educations = state.educations;
      educations[action.data.index] = action.data.value;

      return {
        ...state,
        educations: [...educations],
      };
    }
    case "removeEducationItem": {
      if (!state.educations) {
        return { ...state };
      }
      state.educations = state.educations.filter((e) => e != action.data);
      return {
        ...state,
        educations: [...state.educations],
      };
    }
    case "addExperience": {
      return {
        ...state,
        experiences: [
          ...(state?.experiences ?? []),
          action.data ?? ({} as CvEvent),
        ],
      };
    }
    case "updateExperienceItem": {
      if (!state.experiences) {
        return { ...state };
      }
      const experiences = state.experiences;
      experiences[action.data.index] = action.data.value;

      return {
        ...state,
        experiences: [...experiences],
      };
    }
    case "removeExperienceItem": {
      if (!state.experiences) {
        return { ...state };
      }
      state.experiences = state.experiences.filter((e) => e != action.data);
      return {
        ...state,
        experiences: [...state.experiences],
      };
    }
    case "addProject": {
      return {
        ...state,
        projects: [
          ...(state?.projects ?? []),
          action.data ?? ({} as CvEvent),
        ],
      };
    }
    case "updateProject": {
      if (!state.projects) {
        return { ...state };
      }
      const projects = state.projects;
      projects[action.data.index] = action.data.value;

      return {
        ...state,
        projects: [...projects],
      };
    }
    case "removeProject": {
      if (!state.projects) {
        return { ...state };
      }
      state.projects = state.projects.filter((e) => e != action.data);
      return {
        ...state,
        projects: [...state.projects],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

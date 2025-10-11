import { createContext } from "react";
import { Models } from "node-appwrite";

interface AppContextType {
  user: Models.User<Models.Preferences> | null;
  userDataLoading: boolean;
  resetLoggedInUser: () => Promise<Models.User<Models.Preferences> | null>;
  isLoginChecked: boolean;
}

export const appContext = createContext<AppContextType>({
  user: null,
  userDataLoading: false,
  resetLoggedInUser: async () => null,
  isLoginChecked: false,
});

import { useEffect, useState } from "react";
import { Models } from "node-appwrite";
import { useSearchParams } from "next/navigation";
import { appContext } from "@/ui/context/app.context";
import { getLoggedInUser } from "@/server/actions/auth";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  const [user, setUser] = useState<null | Models.User<Models.Preferences>>(null);
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const [userDataLoading, setUserDataLoading] = useState(false);

  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth");

  async function resetLoggedInUser() {
    setUserDataLoading(true);
    return getLoggedInUser()
      .then((user) => {
        setUser(user);
        return user;
      })
      .catch(() => {
        setUser(null);
        return null;
      })
      .finally(() => {
        setUserDataLoading(false);
        setIsLoginChecked(true);
      });
  }

  useEffect(() => {
    resetLoggedInUser();
  }, []);

  useEffect(() => {
    if (authParam === "true" && user === null) {
      resetLoggedInUser();
    } else if (authParam === "false" && user !== null) {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authParam]);

  return (
    <appContext.Provider value={{ user, userDataLoading, isLoginChecked, resetLoggedInUser }}>
      {children}
    </appContext.Provider>
  );
}

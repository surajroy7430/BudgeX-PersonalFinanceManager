import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

const UserInfoContext = createContext();
export const useUserInfo = () => useContext(UserInfoContext);

export const UserInfoProvider = ({ children }) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "user@budgex.com",
    photoUrl: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchUserInfo = async () => {
      if (!user?.uid) {
        setUserInfo({
          name: "User",
          email: "user@budgex.com",
          photoUrl: "",
        });
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!isMounted) return;

        if (docSnap.exists()) {
          const data = docSnap.data();

          setUserInfo({
            name: data.name || "User",
            email: data.email || "user@budgex.com",
            photoUrl: user.photoURL || "",
          });
        } else if (user.photoURL) {
          setUserInfo({
            name: "User",
            email: "user@budgex.com",
            photoUrl: user.photoURL,
          });
        }
      } catch (error) {
        toast.error("Error fetching user info!");
      }
    };

    fetchUserInfo();

    return () => (isMounted = false);
  }, [user]);

  const userValue = useMemo(() => userInfo, [userInfo]);

  return (
    <UserInfoContext.Provider value={userValue}>
      {children}
    </UserInfoContext.Provider>
  );
};

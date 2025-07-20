import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const UserInfoContext = createContext();

export const useUserInfo = () => useContext(UserInfoContext);

export const UserInfoProvider = ({ children }) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "Account",
    photoUrl: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() || user.photoURL) {
        const data = docSnap.data();
        if (data.name || data.email) {
          setUserInfo({
            name: data.name,
            email: data.email,
            photoUrl: user.photoURL || "",
          });
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

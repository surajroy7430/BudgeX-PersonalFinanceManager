import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { resetIncome } from "@/features/income/incomeSlice";
import { resetExpenses } from "@/features/expenses/expenseSlice";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signupInProgress, setSignupInProgress] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      // Resets redux state
      dispatch(resetIncome());
      dispatch(resetExpenses());

      if (!signupInProgress) {
        setUser(currentUser || null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, [signupInProgress]);

  const logout = async () => {
    // Resets redux state
    await signOut(auth);

    dispatch(resetIncome());
    dispatch(resetExpenses());

    setUser(null);
  };

  const authValues = useMemo(
    () => ({
      user,
      loading,
      logout,
      signupInProgress,
      setSignupInProgress,
    }),
    [user, loading, logout, signupInProgress, setSignupInProgress]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

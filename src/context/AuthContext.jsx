import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };
  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, username: displayName, userPhoto: photoURL });
      } else {
        setCurrentUser(null);
      }
    });
    return unsubcribe();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signInWithGoogle,
    logout,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

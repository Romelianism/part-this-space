import {
  onAuthStateChanged,
  signOut as authSignOut,
  User,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebase";

const useUser = (
  onUserStateChanged?: (user: User | null) => void
): [User | null | undefined, boolean, () => void] => {
  const [user, setUser] = useState(auth?.currentUser);
  const [loading, setLoading] = useState(true);

  const signOut = () => {
    if (!auth) return;
    authSignOut(auth!);
  };

  if (auth)
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (loading) setLoading(false);
      if (onUserStateChanged) onUserStateChanged(user);
    });
  return [user, loading, signOut];
};

export default useUser;

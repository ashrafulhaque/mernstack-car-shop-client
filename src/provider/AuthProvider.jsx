import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (
    displayName,
    email,
    password,
    phone,
    photoURL,
    address
  ) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user state with the new information
      setUser(auth.currentUser);

      const dbResponse = await fetch("http://localhost:5000/userList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: res.user.uid,
          displayName: displayName,
          email: res.user.email,
          phone: phone,
          photoURL: photoURL || "/profile-placeholder.png",
          address: address,
          isAdmin: false,
          isActive: true,
        }),
      });
      if (!dbResponse.ok) {
        throw new Error("Failed to save user data to the database.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async (userUpdateData) => {
    setLoading(true);
    try {
      // Make API call to update user information
      const dbResponse = await fetch(`http://localhost:5000/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdateData),
      });

      setUser((prevUser) => ({ ...prevUser, ...userUpdateData }));
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
    } catch (error) {
      console.error("Error during login from:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            try {
              const response = await fetch(
                `http://localhost:5000/userList/${currentUser.uid}`
              );

              if (!response.ok) {
                throw new error("Failed to fetch userdata from database");
              }

              const data = await response.json();
              setUser(data);
            } catch (error) {}
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
        setLoading(false);
      });
  }, []);

  const authInfo = {
    createUser,
    updateProfile,
    loginWithEmail,
    user,
    userLogout,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent";
import { backend } from "declarations/backend";
import { mapOptionalToFormattedJSON, getInternetIdentityNetwork } from "./_utils";
import { useErrorAlert } from "./provider-erroralert";

const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [authClient, setAuthClient] = useState(null);
  const [user, setUser] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useErrorAlert();

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create({
        identityProvider: getInternetIdentityNetwork(),
      });
      setAuthClient(client);
      await updateIdentity(client);
    };
    initAuth();
  }, []);

  const updateIdentity = async (client) => {
    try {
      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const newIdentity = client.getIdentity();
        setIdentity(newIdentity);
        Actor.agentOf(backend).replaceIdentity(newIdentity);
        const userResponse = await backend.login();

        setIsLoading(false);

        if ("ok" in userResponse) {
          setUser(mapOptionalToFormattedJSON(userResponse.ok));

          if (userResponse.ok.isRegistered[0] === 0) {
            navigate("/register");
          }
        } else if ("err" in userResponse) {
          console.log("Error:", userResponse.err);
        }
      } else {
        setIsLoading(false);
        // navigate("/get-started"); // cek dulu
      }
    } catch (err) {
      showError(err);
    }
  };

  const login = async () => {
    if (!authClient) return;
    await new Promise((resolve, reject) =>
      authClient.login({
        identityProvider: getInternetIdentityNetwork(),
        onSuccess: resolve,
        onError: reject,
      })
    );
    await updateIdentity(authClient);
  };

  const logout = async () => {
    await authClient.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/get-started");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        identity,
        logout,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState } from "react";

// Create Context Object
export const AuthContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};

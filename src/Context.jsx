import router from "./routers/router.jsx";
import { UserContext } from "./context/UserContext.jsx";
import { RouterProvider } from "react-router-dom";
import { useState } from "react";
const Context = () => {
  const [user, setUser] = useState("" | undefined);
  const [contextEmail, setContextEmail] = useState("" | undefined);
  const value = { user, setUser, contextEmail, setContextEmail };
  return (
    <UserContext.Provider value={value}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default Context;

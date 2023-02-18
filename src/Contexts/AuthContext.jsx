import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(loggedInUser ? loggedInUser : null);
  const [status, setStatus] = useState("idle"); // idle, pending, fulfilled, rejected
  const [message, setMessage] = useState("");

  // const BASE_URL = `https://ill-red-adder-wig.cyclic.app/`;
  // const BASE_URL = `http://localhost:5000/api/users/`;
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? `https://portal-server-c5kj.onrender.com/api/users/`
      : `http://localhost:5000/api/users/`;
  // Sign Up User

  // THE LOG IN FUNCTION
  const signUp = async (data) => {
    try {
      // make a request to the server with the user {data}
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // get the response and store in a variable
      const result = await response.json();

      // the request is successful, the status is set to successful
      setStatus("fulfilled");

      // the user data is set and stored in local storage
      setUser(data);
      localStorage.setItem("user", JSON.stringify(result));

      // to reload the page so the data should populate the page
      window.location.reload();
    } catch (e) {
      // if the request failed
      setStatus("rejected");
      setMessage(`Error making POST request: ${e}`);
      console.log("Error making POST request: ", e);
    }
  };

  // THE LOG IN FUNCTION
  const logIn = async (data) => {
    try {
      // make a request to the server with the user {data}
      const response = await fetch(`${BASE_URL}signin/`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // get the response and store in a variable
      const result = await response.json();

      // the request is successful, the status is set to successful
      setStatus("fulfilled");

      // the user data is set and stored in local storage
      setUser(data);
      localStorage.setItem("user", JSON.stringify(result));

      // to reload the page so the data should populate the page
      window.location.reload();
    } catch (e) {
      // if the request failed
      setStatus("rejected");
      setMessage(`Error making POST request: ${e}`);
      console.log("Error making POST request: ", e);
    }
  };

  // Log Out a User
  const logout = () => {
    localStorage.removeItem("user");
    setStatus("idle");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, status, message, signUp, logIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

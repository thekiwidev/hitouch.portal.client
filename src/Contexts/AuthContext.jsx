import { createContext, useState } from "react";

// const BASE_URL = `https://ill-red-adder-wig.cyclic.app/`;
// const BASE_URL = `http://localhost:5000/api/users/`;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://portal-server-c5kj.onrender.com/api/users/`
    : `http://localhost:5000/api/users/`;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [status, setStatus] = useState("idle"); // idle, pending, fulfilled, rejected
  const [message, setMessage] = useState("");

  // Sign Up User
  // *================================================================
  // !THE LOG IN FUNCTION
  // *================================================================

  const signUp = async (data) => {
    // request url
    const url = BASE_URL;

    try {
      // make a request to the server with the user {data}
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setStatus("fulfilled");
        setUser(responseData);
        localStorage.setItem("user", JSON.stringify(responseData));
      } else {
        console.log("Error:", response.status);
      }
      // window.location.reload();
    } catch (e) {
      // if the request failed
      setStatus("rejected");
      setMessage(`Error making POST request: ${e}`);
      console.log("Error making POST request: ", e);
    }
  };

  // *================================================================
  // !THE LOG IN FUNCTION
  // *================================================================
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

      if (response.ok) {
        const responseData = await response.json();
        setStatus("fulfilled");
        setUser(responseData);
        localStorage.setItem("user", JSON.stringify(responseData));
      } else {
        console.log("Error:", response.status);
      }
    } catch (e) {
      //! if the request failed
      setStatus("rejected");
      setMessage(`Error making POST request: ${e}`);
      console.log("Error making POST request: ", e);
    }
  };

  // *================================================================
  // !Log Out a User
  // *================================================================
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

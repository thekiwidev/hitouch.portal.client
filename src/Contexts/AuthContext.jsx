import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(loggedInUser ? loggedInUser : null);
  const [status, setStatus] = useState("idle"); // idle, pending, fulfilled, rejected
  const [message, setMessage] = useState("");

  // const BASE_URL = `https://ill-red-adder-wig.cyclic.app/api/`;
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? `https://ill-red-adder-wig.cyclic.app/api/users/`
      : `http://localhost:5000/api/users/`;
  // Sign Up User

  const signUp = (userData) => {
    setStatus("pending");

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (!res.ok) {
          setStatus("rejected");
          setMessage("SOME ERROR");
          res.clone();
          console.log(res.json());
          return res.json();
        }
      })
      .then((data) => {
        setStatus("fulfilled");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        setStatus("rejected");
        setMessage(err.message);
      });
  };

  // Sign In User
  const signIn = (userData) => {
    setStatus("pending");

    fetch(`${BASE_URL}signin/`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (!res.ok) {
          setStatus("rejected");
          setMessage("SOME ERROR");
          res.clone();
          let logRes = res.clone();
          console.log(logRes);
          return res.json();
        }
      })
      .then((data) => {
        setStatus("fulfilled");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        let msg = err.message;
        setStatus("rejected");
        setMessage(msg);
      });
  };

  // Log Out a User
  const logout = () => {
    localStorage.removeItem("user");
    setStatus("idle");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, status, message, signUp, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

// fetch(YOUR_URL)
// .then(res => {
//   try {
//     if (res.ok) {
//       return res.json()
//     } else {
//       throw new Error(res)
//     }
//   }
//   catch (err) {
//     console.log(err.message)
//     return WHATEVER_YOU_WANT_TO_RETURN
//   }
// })
// .then (resJson => {
//   return resJson.data
// })
// .catch(err => console.log(err))

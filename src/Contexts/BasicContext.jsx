import { createContext, useState } from "react";

const BasicContext = createContext();

export function BasicProvider({ children }) {
  // useStates
  const [status, setStatus] = useState("idle"); // idle, pending, fulfilled, rejected
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState("");

  // BASE_URL for SERVER
  const BASE_URL = `https://ill-red-adder-wig.cyclic.app/api/users/info/`;

  // Get Logged in user Info
  const getInfo = (token) => {
    setStatus("pending");

    fetch(`${BASE_URL}basic/`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatus("fulfilled");
        setInfo(data[0]);
      })
      .catch((err) => {
        console.log(err);
        let msg = err.message;
        setStatus("rejected");
        setMessage(msg);
      });
  };

  // Get Logged in user Info
  const updateInfo = (id, token, updatedInfo) => {
    setStatus("pending");

    fetch(`${BASE_URL}basic/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatus("fulfilled");
        setInfo(data);
      })
      .catch((err) => {
        setStatus("rejected");
        setMessage(err.message);
      });
  };

  const reset = () => {
    setInfo(null);
    setMessage("");
    setStatus("idle");
  };

  return (
    <BasicContext.Provider
      value={{ status, message, info, getInfo, updateInfo, reset }}
    >
      {children}
    </BasicContext.Provider>
  );
}
export default BasicContext;

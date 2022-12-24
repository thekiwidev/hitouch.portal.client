import { createContext, useState } from "react";

const VisaContext = createContext();

export function VisaProvider({ children }) {
  // useStates
  const [status, setStatus] = useState("idle"); // idle, pending, fulfilled, rejected
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState("");

  // BASE_URL for SERVER
  // const BASE_URL = `https://ill-red-adder-wig.cyclic.app/api/users/info/visa/`;
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? `https://ill-red-adder-wig.cyclic.app/api/users/info/visa/`
      : `http://localhost:5000/api/users/info/visa/`;
  // create a new info Info
  const createInfo = (token, newInfo) => {
    setStatus("pending");

    fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newInfo),
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

  // Get Logged in user Info
  const getInfo = (token) => {
    setStatus("pending");

    fetch(BASE_URL, {
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

  // Update Logged in user Info
  const updateInfo = (id, token, updatedInfo) => {
    setStatus("pending");

    fetch(`${BASE_URL + id}`, {
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

  const resetVisa = () => {
    setInfo(null);
    setMessage("");
    setStatus("idle");
  };

  return (
    <VisaContext.Provider
      value={{
        status,
        message,
        info,
        createInfo,
        getInfo,
        updateInfo,
        resetVisa,
      }}
    >
      {children}
    </VisaContext.Provider>
  );
}
export default VisaContext;

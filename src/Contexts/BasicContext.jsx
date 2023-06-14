import { createContext, useState } from "react";

const BasicContext = createContext();

export function BasicProvider({ children }) {
  // useStates
  const [status, setStatus] = useState("idle"); // idle, pending, fulfilled, rejected
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState("");

  // BASE_URL for SERVER
  // const BASE_URL = `https://ill-red-adder-wig.cyclic.app/api/users/info/`;
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? `https://portal-server-c5kj.onrender.com/api/users/info/`
      : `http://localhost:5000/api/users/info/basic/`;

  // Get Logged in user Info
  const getInfo = async (token) => {
    const url = BASE_URL;
    setStatus("pending");

    try {
      // make a request to the server with the user {data}
      const response = await fetch(url, {
        method: "GET", //* the request type
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //* the autorization jwt token
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData); //* log the responseData
        setStatus("fulfilled");
        setInfo(responseData[0]); //* set the responseData as the basic info
      } else {
        console.log("Error:", response.status);
      }
      // window.location.reload();
    } catch (e) {
      //! if the request failed
      setStatus("rejected");
      setMessage(`Error making POST request: ${e}`);
      console.log("Error making POST request: ", e);
    }
  };

  // Get Logged in user Info
  const updateInfo = async (id, token, updatedInfo) => {
    setStatus("pending");
    const url = `${BASE_URL}${id}`;
    // fetch(`${BASE_URL + id}`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(updatedInfo),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setStatus("fulfilled");
    //     setInfo(data);
    //   })
    //   .catch((err) => {
    //     setStatus("rejected");
    //     setMessage(err.message);
    //   });

    try {
      // make a request to the server with the user {data}
      const response = await fetch(url, {
        method: "PUT", //* the request type
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //* the autorization jwt token
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData); //* log the responseData
        setStatus("fulfilled");
        setInfo(responseData); //* set the responseData as the basic info
      } else {
        console.log("Error:", response.status);
      }
      // window.location.reload();
    } catch (e) {
      //! if the request failed
      setStatus("rejected");
      setMessage(`Error making POST request: ${e}`);
      console.log("Error making POST request: ", e);
    }
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

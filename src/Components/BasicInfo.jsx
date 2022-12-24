import { useContext, useEffect, useState } from "react";
import BasicContext from "../Contexts/BasicContext";
import AuthContext from "../Contexts/AuthContext";
import Loading from "./Loading";

// React Toastify
import { toast } from "react-toastify";

function BasicInfo() {
  const { user } = useContext(AuthContext);
  const { message, status, info, getInfo, updateInfo } =
    useContext(BasicContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    email: "",
    phoneNumber: "",
    dob: "",
    firstLang: "",
    nationality: "",
    passportNum: "",
    passportExpDate: "",
    gender: "",
    maritalStatus: "",
  });

  const {
    firstName,
    lastName,
    otherNames,
    email,
    phoneNumber,
    dob,
    firstLang,
    nationality,
    passportNum,
    passportExpDate,
    gender,
    maritalStatus,
  } = formData;

  // USE EFFECTS

  useEffect(() => {
    if (status === "rejected") {
      console.log(`Some Error took place : => ${message}`);
      toast.error(message);
    }

    if (!info) {
      getInfo(user.token);
    }
  }, [getInfo, info, message, status, user]);

  useEffect(() => {
    if (info) {
      setFormData(info);
    }
    console.log(process.env);
  }, [info]);

  // FUNCTIONS

  const onChange = (e) => {
    if (e.target === document.querySelector("#gender")) {
      setFormData((prevState) => ({
        ...prevState,
        gender: e.target.value,
      }));
    }

    if (e.target === document.querySelector("#maritalStaus")) {
      setFormData((prevState) => ({
        ...prevState,
        maritalStatus: e.target.value,
      }));
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateInfo(info._id, user.token, formData);
  };

  if (status === "pending") return <Loading />;

  return (
    <section className="dashboard-section-user-info-form">
      <form onSubmit={onSubmit} className="form-field">
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={firstName || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          value={lastName || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="otherNames"
          id="otherNames"
          placeholder="Other Names"
          value={otherNames || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="placeholder@email.com"
          value={email || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber || ""}
          onChange={onChange}
        />
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Date of Birth"
          value={dob || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="firstLang"
          id="firstLang"
          placeholder="First Language"
          value={firstLang || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="nationality"
          id="nationality"
          placeholder="Nationality"
          value={nationality || ""}
          onChange={onChange}
        />
        <input
          type="text"
          name="passportNum"
          id="passportNum"
          placeholder="Passport Number"
          value={passportNum || ""}
          onChange={onChange}
        />
        <input
          type="date"
          name="passportExpDate"
          id="passportExpDate"
          placeholder="Passport Exiration Date"
          value={passportExpDate || ""}
          onChange={onChange}
        />

        <select
          name="gender"
          id="gender"
          onChange={onChange}
          value={gender || ""}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="maritalStaus"
          id="maritalStaus"
          onChange={onChange}
          value={maritalStatus || ""}
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>

        <button type="submit" onClick={onSubmit}>
          Save & Continue
        </button>
      </form>
    </section>
  );
}

export default BasicInfo;

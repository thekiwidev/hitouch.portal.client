import { useContext, useEffect, useState } from "react";
import BasicContext from "../Contexts/BasicContext";
import AuthContext from "../Contexts/AuthContext";
import Loading from "./Loading";

// React Toastify
import { toast } from "react-toastify";
import FormHeader from "./FormHeader";

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
    address: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
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
    address,
    city,
    country,
    state,
    zipCode,
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
      <FormHeader title="Basic Infomation" />
      <form onSubmit={onSubmit} className="form-field">
        <div className="input-box">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder=" "
            value={firstName || ""}
            onChange={onChange}
            autoComplete="false"
          />
          <label htmlFor="firstName">First Name</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder=" "
            value={lastName || ""}
            onChange={onChange}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="otherNames"
            id="otherNames"
            placeholder=" "
            value={otherNames || ""}
            onChange={onChange}
          />
          <label htmlFor="otherNames">Other Names</label>
        </div>

        <div className="input-box">
          <input
            type="date"
            name="dob"
            id="dob"
            placeholder=" "
            value={dob || ""}
            onChange={onChange}
          />
          <label htmlFor="dob">Date of Birth</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="firstLang"
            id="firstLang"
            placeholder=" "
            value={firstLang || ""}
            onChange={onChange}
          />
          <label htmlFor="firstLang">Primary Language</label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="nationality"
            id="nationality"
            placeholder=" "
            value={nationality || ""}
            onChange={onChange}
          />
          <label htmlFor="nationality">Nationality</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="passportNum"
            id="passportNum"
            placeholder=" "
            value={passportNum || ""}
            onChange={onChange}
          />
          <label htmlFor="passportNum">Passport Number</label>
        </div>
        <div className="input-box">
          <input
            type="date"
            name="passportExpDate"
            id="passportExpDate"
            placeholder=" "
            value={passportExpDate || " "}
            onChange={onChange}
          />
          <label htmlFor="passportExpDate">Passport Exiration Date</label>
        </div>

        <div className="input-box">
          <select
            name="gender"
            id="gender"
            onChange={onChange}
            value={gender || ""}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {/* <label htmlFor="gender">Gender</label> */}
        </div>

        <div className="input-box">
          <select
            name="maritalStaus"
            id="maritalStaus"
            onChange={onChange}
            value={maritalStatus || ""}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <FormHeader
          title="Address Details"
          styleProp={{ marginInline: "1rem" }}
        />
        <div className="input-box">
          <input
            type="text"
            name="address"
            id="address"
            placeholder=" "
            value={address || ""}
            onChange={onChange}
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="city"
            id="city"
            placeholder=" "
            value={city || ""}
            onChange={onChange}
          />
          <label htmlFor="city">City</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="country"
            id="country"
            placeholder=" "
            value={country || ""}
            onChange={onChange}
          />
          <label htmlFor="country">Country</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="state"
            id="state"
            placeholder=" "
            value={state || ""}
            onChange={onChange}
          />
          <label htmlFor="state">State</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            placeholder=" "
            value={zipCode || ""}
            onChange={onChange}
          />
          <label htmlFor="zipCode">Postal/Zip Code</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="placeholder@email.com"
            value={email || ""}
            onChange={onChange}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder=" "
            value={phoneNumber || ""}
            onChange={onChange}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
        <button type="submit" onClick={onSubmit}>
          Save & Continue
        </button>
      </form>
    </section>
  );
}

export default BasicInfo;

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../Contexts/AuthContext";
import VisaContext from "../Contexts/VisaContext";
import Loading from "./Loading";

function VisaInfo() {
  const { user } = useContext(AuthContext);
  const { message, status, info, getInfo, createInfo, updateInfo } =
    useContext(VisaContext);

  // STATES
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    dob: "",
    firstLang: "",
    nationality: "",
    passportNum: "",
    passportExpDate: "",
  });

  const {
    firstName,
    lastName,
    dob,
    firstLang,
    nationality,
    passportNum,
    passportExpDate,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onCreate = (e) => {
    e.preventDefault();
    createInfo(user.token, formData);
  };
  const onUpdate = (e) => {
    e.preventDefault();
    updateInfo(info._id, user.token, formData);
  };

  useEffect(() => {
    if (!info) {
      getInfo(user.token);
    }

    if (status === "rejected") {
      console.log(`Some Error took place : => ${message}`);
      toast.error(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, message, user]);

  useEffect(() => {
    if (info) {
      setFormData(info);
    }
  }, [info]);

  if (status === "pending") return <Loading />;

  return (
    <section className="dashboard-section-user-info-form">
      <form onSubmit={!info ? onCreate : onUpdate} className="form-field">
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
          type="text"
          name="passportExpDate"
          id="passportExpDate"
          placeholder="Passport Exiration Date"
          value={passportExpDate || ""}
          onChange={onChange}
        />

        <button type="submit">Save & Continue</button>
      </form>
    </section>
  );
}
export default VisaInfo;

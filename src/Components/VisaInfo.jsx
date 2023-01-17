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
        <div className="input-box">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder=" "
            value={firstName || ""}
            onChange={onChange}
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
            type="text"
            name="passportExpDate"
            id="passportExpDate"
            placeholder=" "
            value={passportExpDate || ""}
            onChange={onChange}
          />
          <label htmlFor="passportExpDate">Passport Expiration Date</label>
        </div>
        <button type="submit">Save & Continue</button>
      </form>
    </section>
  );
}
export default VisaInfo;

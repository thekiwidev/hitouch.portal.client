import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

function Signup() {
  // initialize navigate
  const navigate = useNavigate();
  // Import contexts
  const { user, status, message, signUp } = useContext(AuthContext);

  // Use States for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
    console.log(formData);
  };

  useEffect(() => {
    if (status === "rejected") {
      console.log(message);
      toast.error(message);
    }

    if (status === "fulfilled") {
      toast.success(`Sign up Successful`);
    }

    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, message]);

  if (status === "pending") return <Loading />;

  return (
    <section className="sign-card sign-up">
      <div className="contents">
        <div className="left-contents">
          <Link to="/signin">Sign In</Link>
          <Link to="/">Home for no reason</Link>
        </div>
        <div className="right-contents">
          <form className="form-field" onSubmit={onSubmit}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Fisrt Name"
              onChange={onChange}
            />
            <input
              type="lastName"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="example@email.com"
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="R4nD0mP@$$"
              onChange={onChange}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Signup;

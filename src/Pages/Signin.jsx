import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

import Loading from "../Components/Loading";
import { toast } from "react-toastify";

function Signin() {
  // initialize navigate
  const navigate = useNavigate();
  // Import contexts
  const { user, status, message, signIn } = useContext(AuthContext);

  // Use States for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  useEffect(() => {
    if (status === "rejected") {
      console.log(message);
      toast.error(message);
    }

    if (status === "fulfilled") {
      toast.success(`Log in Successful`);
    }

    if (user) {
      navigate("/dashboard");
    }
  }, [status, message, user, navigate]);

  if (status === "pending") return <Loading />;

  return (
    <section className="sign-card sign-in">
      <div className="contents">
        <div className="left-contents">
          <Link to="/signup">Sign Up</Link>
          <Link to="/">Home for no reason</Link>
        </div>
        <div className="right-contents">
          <form className="form-field" onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Signin;

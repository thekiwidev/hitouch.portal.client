import { Link, useNavigate } from "react-router-dom";
import { TbLogin, TbUserPlus } from "react-icons/tb";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import BasicContext from "../Contexts/BasicContext";
import VisaContext from "../Contexts/VisaContext";

import seamLessLogo from "../assets/images/seamless_visa_logo.jpg";

function Header() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const { reset } = useContext(BasicContext);
  const { resetVisa } = useContext(VisaContext);

  const onLogout = () => {
    logout();
    reset();
    resetVisa();
    navigate("/signin");
  };

  return (
    <header className="main-header">
      <div className="contents">
        <div className="logo">
          <a
            href="https://study-abroadd.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={seamLessLogo} alt="seamless visa logo" />
          </a>
        </div>

        <div className="buttons">
          {user ? (
            <button className="action" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" className="sign-in action">
                <TbLogin />
                <p>Login</p>
              </Link>
              <Link to="/signup" className="sign-up action">
                <TbUserPlus />
                <p>Register</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;

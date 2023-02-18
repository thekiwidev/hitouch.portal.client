import { Link, useNavigate } from "react-router-dom";
import { TbLogin, TbUserPlus } from "react-icons/tb";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import BasicContext from "../Contexts/BasicContext";
import VisaContext from "../Contexts/VisaContext";
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
            <svg
              viewBox="0 0 50 50"
              fill="#FFFFFF"
            >
              <path
                d="M25 2C12.309295 2 2 12.309295 2 25C2 37.690705 12.309295 48 25 48C37.690705 48 48 37.690705 48 25C48 12.309295 37.690705 2 25 2 z M 25 4C36.609824 4 46 13.390176 46 25C46 36.609824 36.609824 46 25 46C13.390176 46 4 36.609824 4 25C4 13.390176 13.390176 4 25 4 z M 25 13.994141C24.845 13.994141 24.690781 14.029609 24.550781 14.099609L6.5507812 22.099609C6.2107813 22.269609 6 22.62 6 23C6 23.38 6.2107813 23.730391 6.5507812 23.900391L9 25.572266L9 31.279297C8.4051922 31.626887 8 32.265006 8 33C8 34.1 10 37 10 37C10 37 12 34.1 12 33C12 32.265006 11.594808 31.626887 11 31.279297L11 26.9375L12 27.619141L12 26C12 25.25 12.18 24.620078 12.5 24.080078C14.35 21.000078 20.86 21 25 21C29.02 21 35.280078 21.000078 37.330078 23.830078C37.760078 24.420078 38 25.14 38 26L38 27.619141L43.449219 23.890625C43.789219 23.730625 44 23.38 44 23C44 22.62 43.789219 22.269609 43.449219 22.099609L25.449219 14.099609C25.309219 14.029609 25.155 13.994141 25 13.994141 z M 25 23C19.4 23 14 23.39 14 26L14 28.449219C15.74 27.649219 18.97 27 25 27C31.03 27 34.26 27.649219 36 28.449219L36 26C36 23.39 30.6 23 25 23 z M 25 29 A 11 2 0 0 0 14 31 A 11 2 0 0 0 25 33 A 11 2 0 0 0 36 31 A 11 2 0 0 0 25 29 z"
                fill="#FFFFFF"
              />
            </svg>
            <span>Study Abroad</span>
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

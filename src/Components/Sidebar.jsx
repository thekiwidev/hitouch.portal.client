import { useContext, useEffect } from "react";
import { TbClipboardList, TbMoodSmile } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
function Sidebar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [navigate, user]);

  return (
    <div className="sidebar">
      <div className="contents">
        <Link to="/user" className="user">
          <div className="user-dp">
            <TbMoodSmile className="icon" />
          </div>
          <div className="greet-user">
            <h3>Hi, {user ? user.name : "User"}</h3>
          </div>
        </Link>
        <div className="tab-links">
          <Link to="/info/basic" className="tab-item">
            <TbClipboardList className="tab-icon" />
            <p>User Info</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;

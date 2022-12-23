import { useContext } from "react";
import { TbClipboardList, TbMoodSmile, TbLayout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
function Sidebar() {
  const { user } = useContext(AuthContext);

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
          <Link to="/dashboard" className="tab-item">
            <TbLayout2 className="tab-icon" />
            <p>Dashboard</p>
          </Link>
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

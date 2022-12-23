import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useContext, useEffect } from "react";
import AuthContext from "../Contexts/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [navigate, user]);
  return (
    <div className="home" id="home">
      <Header />
      <div className="body">
        <Sidebar />
        <div className="body-contents">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Home;

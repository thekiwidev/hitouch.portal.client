import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Info from "./Pages/Info";
import BasicInfo from "./Components/BasicInfo";
import VisaInfo from "./Components/VisaInfo";
import EducationInfo from "./Components/EducationInfo";
import OtherInfo from "./Components/OtherInfo";
import { AuthProvider } from "./Contexts/AuthContext";
import { BasicProvider } from "./Contexts/BasicContext";
import { VisaProvider } from "./Contexts/VisaContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <BasicProvider>
            <VisaProvider>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route path="/user" element={<h1>User Info</h1>} />
                    <Route path="/info" element={<Info />}>
                      <Route path="basic" element={<BasicInfo />} />
                      <Route path="education" element={<EducationInfo />} />
                      <Route path="visa" element={<VisaInfo />} />
                      <Route path="others" element={<OtherInfo />} />
                    </Route>
                  </Route>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                </Routes>
              </div>
            </VisaProvider>
          </BasicProvider>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

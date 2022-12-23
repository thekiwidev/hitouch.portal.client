import { Link, Outlet } from "react-router-dom";
import {
  TbUserExclamation,
  TbTicket,
  TbSchool,
  TbAddressBook,
} from "react-icons/tb";

function Info() {
  return (
    <div className="info-page">
      <header className="user-info-header">
        <h1>Update Your Information</h1>
      </header>

      <div className="info-page-body">
        <div className="info-page-tab">
          <Link to="/info/basic">
            <TbUserExclamation /> Personal Information
          </Link>
          <Link to="/info/education">
            <TbSchool />
            Education Information
          </Link>
          <Link to="/info/visa">
            <TbTicket /> Visa Information
          </Link>
          <Link to="/info/others">
            <TbAddressBook /> Other Informations
          </Link>
        </div>

        <div className="form-contents">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Info;

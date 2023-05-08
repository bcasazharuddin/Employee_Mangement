import React from "react";
import AdduserDetails from "./AdduserDetails";

function Header(props) {
  return (
    <nav className="bg-body-tertiary py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between">
              <div className="logo fw-bold fs-4 text-danger">EmpMgt</div>
              <div className="menu-bar">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#adduserdetails"
                >
                  Add User Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdduserDetails />
    </nav>
  );
}

export default Header;

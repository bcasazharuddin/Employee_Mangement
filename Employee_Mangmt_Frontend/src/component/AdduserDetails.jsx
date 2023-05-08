import React, { useState } from "react";
import { useFormik } from "formik";
import { SignupSchema } from "../schema/UserDetailsValidatio";
import axios from "axios";

const initialValues = {
  mobileNo: "",
  email: "",
  name: "",
  pan: "",
  aadhar: "",
};
function AdduserDetails(props) {
  const [errorMessage, setErrormessage] = useState();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values) => {
        console.log(values);
        console.log(values.mobileNo);
        console.log(values.email);
        console.log(values.name);
        console.log(values.pan);
        console.log(values.aadhar);
        try {
          const response = await axios.post(
            `http://localhost:5000/`,
            {
              Email: values.email,
              Name: values.name,
              PAN: values.pan,
              Aadhar: values.aadhar,
              MobileNo: values.mobileNo,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            // window.location = "/";
            console.log(response.data);
            if (response.data == "Already resgistered Email ID") {
              setErrormessage(response.data);
            } else {
              window.location = "/";
            }
          } else {
            alert("Something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  // console.log(Formik);

  // console.log(errorMessage);
  return (
    <div
      className="modal fade"
      id="adduserdetails"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add User Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-2">Registeration Form</h1>
              <div class="mb-2">
                <label class="form-label ">Mobile Number</label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your phone number"
                  name="mobileNo"
                  id="mobileNo"
                  value={values.mobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobileNo && touched.mobileNo ? (
                  <p style={{ color: "red" }}>{errors.mobileNo}</p>
                ) : null}
              </div>
              <div class="mb-2">
                <label class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your Email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={() => {
                    setErrormessage("");
                  }}
                />
                {errors.email && touched.email ? (
                  <p style={{ color: "red" }}>{errors.email}</p>
                ) : null}
                {!errorMessage ? null : (
                  <p style={{ color: "red" }}>{errorMessage}</p>
                )}
              </div>
              <div class="mb-2">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your Name"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p style={{ color: "red" }}>{errors.name}</p>
                ) : null}
              </div>
              <div class="mb-2">
                <label class="form-label">PAN Number</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your PAN "
                  name="pan"
                  id="pan"
                  value={values.pan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.pan && touched.pan ? (
                  <p style={{ color: "red" }}>{errors.pan}</p>
                ) : null}
              </div>
              <div class="mb-2">
                <label class="form-label">Aadhar Number</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your Aadhar Number"
                  name="aadhar"
                  id="aadhar"
                  value={values.aadhar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aadhar && touched.aadhar ? (
                  <p style={{ color: "red" }}>{errors.aadhar}</p>
                ) : null}
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdduserDetails;

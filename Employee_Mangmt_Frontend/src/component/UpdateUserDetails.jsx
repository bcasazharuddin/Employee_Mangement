import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { UpdateSchema } from "../schema/UpdateDetailsValidation";

function UpdateUserDetails(props) {
  //   const { id } = useParams();
  const { singleUserId, particarData } = props;
  console.log("props->", singleUserId);
  // useEffect(async () => {
  //   await particularData();
  // }, []);

  // const = props;
  console.log("g---------------------", particarData[0]);
  const initialValues = {
    mobileNo: particarData[0]?.MobileNo,
    name: particarData[0]?.Name,
    pan: particarData[0]?.PAN,
    aadhar: particarData[0]?.Aadhar,
  };

  // ********************* Update User Details *******************
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: UpdateSchema,
      onSubmit: async (values) => {
        console.log(values);
        console.log(values.mobileNo);
        console.log(values.email);
        console.log(values.name);
        console.log(values.pan);
        console.log(values.aadhar);
        try {
          const response = await axios.put(
            `http://localhost:5000/${singleUserId}`,
            {
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
            window.location = "/";
          } else {
            alert("Something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <div
      className="modal fade"
      id="updateuserdetails"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Details
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
                  disabled={true}
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
                  disabled={true}
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
                Update
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
export default UpdateUserDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewImageDetails(props) {
  const { viewId } = props;
  const [name, setName] = useState();
  const [pan, setPan] = useState();
  const [aadhar, setAadhar] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [createFileDate, setCreateFileData] = useState();
  const [imageData, setImageData] = useState();
  const [LatitudeData, setLatitudeData] = useState();
  const [LongitudeData, setLongitudeData] = useState();
  const [ipAdress, setIPaddress] = useState();
  const [imageCaptureTime, setImageCaptureTime] = useState();
  const [address, setAddress] = useState();
  console.log("id ", viewId);
  // ************************ Show Image ******************

  useEffect(() => {
    axios.get(`http://localhost:5000/showImage/${viewId}`).then((response) => {
      console.log(response.data[0]);
      setImageData(response?.data[0]?.Image);
      //   console.log(response.data[0].Latitude);
      //   console.log(response.data[0].Longitude);
      setLatitudeData(response?.data[0]?.Latitude);
      setLongitudeData(response?.data[0]?.Longitude);
      setName(response?.data[0]?.Name);
      setPan(response?.data[0]?.PAN);
      setAadhar(response?.data[0]?.Aadhar);
      setMobile(response?.data[0]?.MobileNo);
      setImageCaptureTime(response?.data[0]?.Image_Captur_Time);
      setEmail(response?.data[0]?.Email);
      setIPaddress(response?.data[0]?.IP_Address);
      setCreateFileData(response?.data[0]?.Created_File_Time);
      setAddress(response?.data[0]?.Address);
    });
  }, [viewId]);
  // console.log(name);
  return (
    <div>
      <div
        className="modal fade"
        id="viewuserdetails"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                User Details
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex justify-content-between">
              <div
                className="text-uppercase"
                style={{
                  paddingTop: "80px",
                  paddingLeft: "7px",
                }}
              >
                <h3>{name}</h3>
              </div>
              <img
                src={imageData}
                class="rounded-circle border border-dark"
                alt="No Image , Please Click pic"
                width="180"
                height="180"
              />
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Email:
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {email}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                PAN Number :
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {pan}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Mobile :
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {mobile}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Aadhar Number :
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {aadhar}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Create File Date :
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {createFileDate}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Image Latitude :
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {LatitudeData}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Image Longitude :
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {LongitudeData}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                IP Address:
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {ipAdress}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Image Capture Time:
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {imageCaptureTime}
              </h6>
            </div>
            <div class="form-group">
              <label
                class="col-form-label "
                style={{
                  fontWeight: "700",
                  marginLeft: "20px",
                  marginTop: "1px",
                }}
              >
                Address:
              </label>
              <h6
                class="form-control"
                style={{
                  marginLeft: "18px",
                  width: "93%",
                }}
              >
                {address}
              </h6>
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
    </div>
  );
}

export default ViewImageDetails;

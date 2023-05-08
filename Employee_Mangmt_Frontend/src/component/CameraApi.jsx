import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import "../App.css";
// import "/home/mohdazharuddin/React-test/assignement1/src/App.css";
function CameraApi(props) {
  // const webref = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longtitude, setLongtitude] = useState(null);
  const [seconds, setSeconds] = useState(5);
  const [loader, setLoader] = useState(false);
  const [retakeTrue, setRetakeFalse] = useState(false);
  const [captureAlert, setCaptureAlert] = useState(null);
  const [colorCaptureAlert, setColorCaptureAlert] = useState(null);
  const [address, setAddress] = useState(null);

  const { id } = useParams();
  // console.log(id);

  let img = null;
  // ************************* face dectection ****************************

  const { isLoading, detected, webcamRef, boundingBox, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),

      camera: ({ mediaSrc, onFrame, width, height }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });

  // console.log("loading------------", isLoading, facesDetected);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setLatitude("Geolocation is not supported by this browser.");
      setLongtitude("Geolocation is not supported by this browser.");
    }
  };

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongtitude(position.coords.longitude);
    AddressApi(position.coords.longitude, position.coords.latitude);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds]);

  useEffect(() => {
    // updateImage();

    if (isLoading == false) {
      captureImage();
    }
    // console.log("useEffect------------------------", facesDetected);
  }, [loader, isLoading]);

  // console.log("outer No==", facesDetected);
  const captureImage = () => {
    setTimeout(async () => {
      if (facesDetected != 1) {
        setCaptureAlert(`Click only one human Face : ${facesDetected}`);
        setColorCaptureAlert("red");
        setRetakeFalse(true);
      } else {
        img = webcamRef?.current?.getScreenshot();
        getLocation();
        setData(img);
        setCaptureAlert("Successful Capture Image");
        setColorCaptureAlert("green");
        setRetakeFalse(true);
      }
    }, 5000);
  };

  // console.log("outer nichai No==", facesDetected);
  // console.log(Address);

  const AddressApi = async (longtitude, latitude) => {
    // console.log("Addeswss==", latitude);
    const response = await fetch(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${longtitude},${latitude}`
    );
    const dataValue = await response.json();
    setAddress(dataValue.address.LongLabel);
    console.log(dataValue.address.LongLabel);
  };

  const ImageDataApiUpdate = async () => {
    //  AddressApi(longtitude, latitude);
    if (data) {
      console.log(latitude);
      console.log(longtitude);
      console.log("image", data);
      console.log("gsdf", address);
      try {
        const response = await axios.put(
          `http://localhost:5000/Image/${id}`,
          {
            Image: data,
            Latitude: latitude,
            Longitude: longtitude,
            Address: address,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status == 200) {
          // navigate("/");
          // setLoader(false);
          // setData("");
          // navigate("/");
          window.location = "/";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //  ======   Gecode Api Address ==============================

  // const updateImage = () => {
  //   setTimeout(async () => {
  //     img = webref?.current?.getScreenshot();

  //     getLocation();
  //     setData(img);
  //     // console.log(data);
  //     if (data) {
  //       console.log(latitude);
  //       console.log(longtitude);
  //       console.log("imagw", data);
  //       try {
  //         const response = await axios.put(
  //           `http://localhost:5000/Image/${id}`,
  //           {
  //             Image: data,
  //             Latitude: latitude,
  //             Longitude: longtitude,
  //           },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         if (response.status == 200) {
  //           // navigate("/");
  //           // setLoader(false);
  //           // setData("");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }, 5000);
  // };
  //   console.log("Data", data);
  // console.log(data);

  return (
    <div>
      <div className="camera-box container">
        {data ? (
          <div className="d-flex justify-content-center my-1">
            <img
              src={data}
              class="rounded-circle"
              alt="No Image , Please Click pic"
            />
          </div>
        ) : (
          <div style={{ width: "100%", height: "500px", position: "relative" }}>
            {boundingBox.map((box, index) => (
              <div
                key={`${index + 1}`}
                style={{
                  border: "4px solid green",
                  borderRadius: "5%",
                  position: "absolute",
                  top: `${box.yCenter * 80}%`,
                  left: `${box.xCenter * 100}%`,
                  width: `${box.width * 50}%`,
                  height: `${box.height * 50}%`,
                  zIndex: 1,
                }}
              />
            ))}

            <Webcam
              class="rounded-circle"
              style={{
                // objectFit: 'cover',
                marginLeft: "200px",
                position: "absolute",
                borderRadius: "100%",
              }}
              audio={true}
              ref={webcamRef}
            />
          </div>
        )}
        {seconds > 0 ? (
          <div class="topleft">
            <h3 className="seconds">{seconds}</h3>
          </div>
        ) : null}
      </div>
      <div>
        <div className="d-flex justify-content-center my-1">
          {retakeTrue == true ? (
            <button
              type="button"
              onClick={() => {
                if (loader == false) {
                  setLoader(true);
                } else {
                  setLoader(false);
                }
                setSeconds(5);
                setCaptureAlert(null);
                setData(null);
                // navigate(`/${id}`http://localhost:3003/:16);
                // window.location = `/${id}`;
                window.location.reload(false);
              }}
              class="btn btn-danger"
            >
              Retake
            </button>
          ) : null}
          {data ? (
            <button
              type="button"
              class="btn btn-success mx-1"
              onClick={() => {
                ImageDataApiUpdate();
              }}
            >
              Submit
            </button>
          ) : null}
        </div>
        {captureAlert ? (
          <div className="d-flex justify-content-center my-1">
            <h3 style={{ color: colorCaptureAlert, marginTop: "10px" }}>
              {captureAlert}
            </h3>
          </div>
        ) : null}
        {/* {data ? (
          <div className="d-flex justify-content-center my-1">
            <img
              src={data}
              class="rounded-circle"
              alt="No Image , Please Click pic"
            />
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default CameraApi;

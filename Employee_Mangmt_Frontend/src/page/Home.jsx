import axios from "axios";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdTipsAndUpdates } from "react-icons/md";
import { MdOutlineViewHeadline } from "react-icons/md";
import { Link } from "react-router-dom";
import UpdateUserDetails from "../component/UpdateUserDetails";
import ViewImageDetails from "../component/ViewImageDetails";
function Home(props) {
  const [userdata, setUserdata] = useState([]);
  const [loader, setLoader] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [previousDisabled, setpreviousDisabled] = useState(false);
  const [singleUserId, setSingleId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [itemLength, setItemLength] = useState();
  const [page, setPage] = useState(1);
  const [particarData, setParticularData] = useState([]);

  const pageCount = Math.ceil(itemLength?.length / 5);

  const handleprevious = () => {
    console.log("previous");
    if (page > 1) {
      setPage(page - 1);
      setLoader(true);
      setNextDisabled(false);
    } else {
      setpreviousDisabled(true);
    }
  };

  const handleNext = () => {
    console.log("Next");
    if (page < pageCount) {
      setPage(page + 1);
      setLoader(true);
      setpreviousDisabled(false);
    } else {
      setNextDisabled(true);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/?page=${page}&limit=5`)
      .then((response) => {
        // Array.sort(response.data);
        setUserdata(response.data.result);
        setItemLength(response.data.len[0]);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoader(false);
  }, [loader]);

  //*********************single user**************** */
  const particularData = async (sinid) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/particular/${sinid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        console.log("___________________=======", response?.data);
        setParticularData(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ****************** Delete User Details**************************
  const handleDelete = async (Id) => {
    try {
      const response = await axios.put(`http://localhost:5000/delete/${Id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        window.location = "/";
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   create download pdf
  const createandDownloadPdf = async (Id) => {
    console.log("id+++++++++++++++", Id);
    const response = await axios.get(`http://localhost:5000/pdf/${Id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("----", response.data[0]);

    if (response.status == 200) {
      // setPdfData(response?.data[0]);

      if (response?.data[0]) {
        axios
          .post("http://localhost:5000/create-pdf", response?.data[0])
          .then(() =>
            axios.get("http://localhost:5000/fetch-pdf", {
              responseType: "blob",
            })
          )
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, `${Id}.pdf`);
          });
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1> User Details </h1>
          <div className="mt-5">
            <table className=" table table-striped  border">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col">Pan No</th>
                  <th scope="col">Aadhar No</th>
                  <th scope="col">Mobile No</th>
                  <th scope="col">Create File Time</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Image</th>
                </tr>
              </thead>
              <tbody>
                {userdata.map((user) => (
                  <tr key={user.Id}>
                    <td>
                      <Link to={`/${user.Id}`}>{user.Id}</Link>
                    </td>

                    <td>{user.Email}</td>
                    <td>{user.Name}</td>
                    <td>{user.PAN}</td>
                    <td>{user.Aadhar}</td>
                    <td>{user.MobileNo}</td>
                    <td>{user.Created_File_Time}</td>
                    <td>
                      {/* <Link to={`/${user.Id}`}> */}
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#updateuserdetails"
                        onClick={() => {
                          setSingleId(user.Id);
                          particularData(user.Id);
                        }}
                      >
                        <MdTipsAndUpdates />
                      </button>
                      {/* </Link> */}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          handleDelete(user.Id);
                        }}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#viewuserdetails"
                        onClick={() => setViewId(user.Id)}
                      >
                        <MdOutlineViewHeadline /> View
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          createandDownloadPdf(user.Id);
                        }}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UpdateUserDetails
            singleUserId={singleUserId}
            particarData={particarData}
          />
          <ViewImageDetails viewId={viewId} />
          <nav aria-label="Page navigation example">
            <ul className="pagination d-flex justify-content-between">
              <li className="page-item">
                <button
                  className="page-link"
                  disabled={previousDisabled}
                  onClick={() => handleprevious()}
                >
                  Previous
                </button>
              </li>

              <li className="page-item">
                <button
                  className="page-link"
                  disabled={nextDisabled}
                  onClick={() => handleNext()}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Home;

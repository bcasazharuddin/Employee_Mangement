const express = require("express");
const app = express();
const con = require("./Config");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const jwtKey = "Azhar";

const Joi = require("joi");
app.use(cors());
app.use(express.json());
var moment = require("moment");
// ip addresss
const address = require("address");
// pdf dwonload
// const pdf = require("html-pdf");
// const pdfTemplate = require("./documents");

// // post -pdf generation and fetching of the data
// app.post("/create-pdf", (req, res) => {
//   // console.log("Image ==", req.body.Image);
//   pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
//     if (err) {
//       res.send(Promise.reject());
//     }

//     res.send(Promise.resolve());
//   });
// });
// // GET - send the generated PDF to the client
// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);
// });

// //  ****************************** second method pdf
// const puppeteer = require("puppeteer");
// const hbs = require("handlebars");
// const fs = require("fs-extra");
// const path = require("path");

// const compile = async function (templateName, data) {
//   const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
//   const html = await fs.readFile(filePath, "utf8");
//   return hbs.compile(html)(data);
// };
// app.post("/create-pdf", async (req, res) => {
//   try {
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();

//     const content = await compile("index", req.body);
//     await page.setContent(content);

//     await page.pdf({
//       path: "output.pdf",
//       format: "A4",
//       printBackground: true,
//     });

//     console.log("done creating pdf");

//     await browser.close();

//     process.exit();
//   } catch (e) {
//     console.log(e);
//   }
// });

// // GET - send the generated PDF to the client
// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/output.pdf`);
// });

// third Apply

function templateName(data) {
  const today = new Date();
  return new Promise((resolve, reject) => {
    html = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <title>Pdf result Template</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
     
    </head>
    <body>
     
      <div style="margin-top: 5px">
     
        <h1 class="text-center">User Details</h1>
        
      </div>
      <div class="d-flex justify-content-around">
        <div
          class="text-uppercase"
          style="padding-top: 80px; padding-left: 7px"
        >
          <h3>${data.Name}</h3>
        </div>
        <img
          
          src= ${data.Image}
          class="rounded-circle border border-dark"
          width="180"
          height="180"
          style="margin-right: 10px"
        />
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Email:
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Email}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          PAN Number :
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">${
          data.PAN
        }</h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Mobile :
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.MobileNo}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Aadhar Number :
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Aadhar}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Create File Date :
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Created_File_Time}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Image Latitude :
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Latitude}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Image Longitude :
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Longitude}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          IP Address:
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.IP_Address}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Image Capture Time:
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Image_Captur_Time}
        </h6>
      </div>
      <div class="form-group">
        <label
          class="col-form-label"
          style="font-weight: 700; margin-left: 20px; margin-top: 1px"
        >
          Address:
        </label>
        <h6 class="form-control" style="margin-left: 18px; width: 93%">
          ${data.Address}
        </h6>
      </div>
      <p>Download File Date : ${`${today.getDate()}.${
        today.getMonth() + 1
      }.${today.getFullYear()} ${today.getHours()}:${
        today.getMinutes() < 10
          ? `0${today.getMinutes()}`
          : `${today.getMinutes()}`
      }:${today.getSeconds()}.`}</p>
    </body>
  </html>`;
    resolve(html);
  });
}
const puppeteer = require("puppeteer");
const fs = require("fs");
app.post("/create-pdf", async (req, res) => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();
  const html = await templateName(req.body);
  console.log(html);
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: "result.pdf",
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Close the browser instance
  await browser.close();
  res.send(Promise.resolve());
});
// GET - send the generated PDF to the client
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

// console.log(LatLngAdr);
//User-defined function to validate the user
function validateUser(user) {
  const JoiSchema = Joi.object({
    Email: Joi.string()
      .regex(/([a-zA-Z0-9+_.-])(@(gmail|yahoo).com)$/)
      .required(),
    Name: Joi.string().min(2).max(80).required(),
    PAN: Joi.string()
      .regex(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/)
      .required(),
    Aadhar: Joi.string()
      .regex(
        /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
      )
      .max(12)
      .required(),
    MobileNo: Joi.string()
      .regex(/([6-9]){1}([0-9]){9}$/)
      .max(10)
      .required(),
    Created_File_Time: Joi.number(),
  });

  return JoiSchema.validate(user);
}
// User Updated Validation

function validateUpdateUser(user) {
  const JoiSchema = Joi.object({
    Name: Joi.string().min(2).max(80).required(),
    PAN: Joi.string()
      .regex(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/)
      .required(),
    Aadhar: Joi.string()
      .regex(
        /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
      )
      .max(12)
      .required(),
    MobileNo: Joi.string()
      .regex(/([6-9]){1}([0-9]){9}$/)
      .max(10)
      .required(),
  });

  return JoiSchema.validate(user);
}
// ***************** get APi ************************8
// app.get("/", (req, resp) => {
//   //   resp.send("route done");
//   console.log(req.query);
//   con.query(
//     "Select Id , Email ,Name ,PAN , Aadhar ,MobileNo ,from_unixtime(Created_File_Time, '%D %M %Y') as Created_File_Time,Image, Latitude,Longitude from UserDetails where Flag = 1 order by id asc",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         resp.send("err");
//       } else {
//         console.log(result);
//         resp.send(result);
//       }
//     }
//   );
// });
// ******************** Pagination ********************
app.get("/", (req, resp) => {
  let len;
  con.query(
    "Select count(*) as length from UserDetails where Flag = 1",
    (error, result) => {
      len = result;
    }
  );
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2; //   resp.send("route done");
  console.log(req.query);
  let reqObj = {};
  const skip = (page - 1) * limit;

  con.query(
    `Select Id , Email ,Name ,PAN , Aadhar ,MobileNo ,from_unixtime(Created_File_Time, '%D %M %Y %h:%i %p') as Created_File_Time,Image, Latitude,Longitude from UserDetails where Flag = 1 order by id asc LIMIT ${limit} OFFSET ${skip}`,
    (err, result) => {
      if (err) {
        console.log(err);
        // resp.send("err");
      } else {
        console.log(result);
        reqObj.result = result;
        reqObj.len = len;

        resp.send(reqObj);
      }
    }
  );
});
// **********Post Api **********
app.post("/", (req, resp) => {
  req.body.Created_File_Time = moment().unix();
  const data = req.body;
  // const data = req.body.Email;
  var flag = false;
  // console.log(data);
  // console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const response = validateUser(data);
  if (response.error) {
    console.log(response.error.details);
  } else {
    con.query(
      `Select * from UserDetails where Email= '${req.body.Email}'`,
      (error, result) => {
        if (error) {
          console.log(error);
        }
        // console.log(result);
        // return;
        if (result.length > 0) {
          flag = true;
        }
        if (!flag) {
          con.query("Insert into UserDetails set ?", [data], (err, result) => {
            if (err) {
              console.log(err.message);
              // resp.send("error");
              console.log(err);
            }
            resp.send(result);
          });
        } else {
          console.log("Duplicate Entry");
          resp.send("Already resgistered Email ID");
        }
      }
    );
  }
});

app.put("/:Id", (req, resp) => {
  const data = [
    req.body.Name,
    req.body.PAN,
    req.body.Aadhar,
    req.body.MobileNo,
    req.params.Id,
  ];
  const data2 = req.body;
  // console.log(data);
  const response = validateUpdateUser(data2);
  if (response.error) {
    console.log(response.error.details);
  } else {
    con.query(
      "UPDATE UserDetails SET Name=?,PAN=?,Aadhar=?,MobileNo=? where Id=? ",
      data,
      (err, result) => {
        if (err) {
          resp.send(err.message);
        } else {
          resp.send(result);
        }
      }
    );
  }
  //   resp.send("update database");
});

app.put("/delete/:Id", (req, resp) => {
  req.body.Flag = 0;
  const data = [req.body.Flag, req.params.Id];
  // const data2 = req.body;
  // console.log(data);

  con.query(
    "UPDATE UserDetails SET Flag=? where Id=? ",
    data,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        resp.send(result);
      }
    }
  );

  //   resp.send("update database");
});
app.delete("/:id", (req, resq) => {
  con.query("DELETE FROM UserDetails WHERE Id=" + req.params.id, (err, res) => {
    if (err) throw err;

    resq.send(res);
  });
});

// ***************************** Update Image *********************

app.put("/Image/:Id", (req, resp) => {
  req.body.IP_Address = address.ip();
  // var capture_time = moment(Date.now()).format("YYYY-MM-DD");
  req.body.Image_Captur_Time = moment().unix();
  // console.log("timee====", capture_time);
  const data = [
    req.body.Image,
    req.body.Latitude,
    req.body.Longitude,
    req.body.IP_Address,
    req.body.Image_Captur_Time,
    req.body.Address,
    req.params.Id,
  ];
  // console.log("body", req.body);
  // const data2 = req.body;
  // console.log("data================================ image====", data);

  con.query(
    "UPDATE UserDetails SET Image=?,Latitude=?,Longitude=?,IP_Address=?,Image_Captur_Time=?,Address=? where Id=? ",
    data,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        resp.send(result);
        // console.log("===resu;lt====", result);
      }
    }
  );
});

// ******************** show Image *********************

app.get("/showImage/:Id", (req, resp) => {
  //   resp.send("route done");
  const data = [req.params.Id];

  // console.log(req.query);
  con.query(
    "Select Email,Name,PAN,Aadhar,MobileNo,from_unixtime(Created_File_Time, '%D %M %Y %h:%i %p ') as Created_File_Time,Image,Latitude,Longitude,IP_Address,from_unixtime(Image_Captur_Time, '%D %M %Y %h:%i %p ') as Image_Captur_Time,Address from UserDetails where Id=?",
    data,
    (err, result) => {
      if (err) {
        // console.log(err);
        resp.send("err");
      } else {
        // console.log(result);
        resp.send(result);
      }
    }
  );
});

// ********************** Particular User ************************

app.get("/particular/:Id", (req, resp) => {
  //   resp.send("route done");
  // console.log(req.query);
  const data = [req.params.Id];
  con.query(
    "Select Id,Email ,Name ,PAN , Aadhar ,MobileNo ,from_unixtime(Created_File_Time, '%D %M %Y %h:%i %p') as Created_File_Time,Image, Latitude,Longitude,IP_Address,from_unixtime(Image_Captur_Time, '%D %M %Y %h:%i %p ') as Image_Captur_Time,Address from UserDetails where Flag = 1 and Id=?",
    data,
    (err, result) => {
      if (err) {
        // console.log(err);
        resp.send("err");
      } else {
        // console.log(result);
        // console.group("mesfsdsgs");
        resp.send(result);
      }
    }
  );
});

// ==== pdf api daata
app.get("/pdf/:Id", (req, resp) => {
  //   resp.send("route done");
  // console.log(req.query);
  const data = [req.params.Id];
  con.query(
    "Select Id,Email ,Name ,PAN , Aadhar ,MobileNo ,from_unixtime(Created_File_Time, '%D %M %Y %h:%i %p') as Created_File_Time,Image, Latitude,Longitude,IP_Address,from_unixtime(Image_Captur_Time, '%D %M %Y %h:%i %p ') as Image_Captur_Time,Address from UserDetails where Flag = 1 and Id=?",
    data,
    (err, result) => {
      if (err) {
        console.log(err);
        resp.send("err");
      } else {
        // console.log(result);

        resp.send(result);
      }
    }
  );
});
app.listen(5000);

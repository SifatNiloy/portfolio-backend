const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = express.Router();
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", router);

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: `sifatniloy20@gmail.com`,
    // pass: `delu bhmt vvgt uerv`,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.error("Error verifying email transport:", error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: `${name} <${email}>`, // Update with your email address
    to: "sifatniloy18@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ code: 500, status: "Internal Server Error" });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

app.get("/", (req, res) => {
  res.send(`server running `);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const Job = require("../models/Job");
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const fs = require("fs");

const apply = async (req, res) => {
  const output = `
    <p>You have a new job application</p>
    <h3>Job seeker Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Message: ${req.body.message}</li>
    </ul>    
  `;
  if (req.file) path = req.file.path;
  const apply = await Job.findById({ _id: req.params.id });

  const isExist = apply.condidats.find((el) => el == req.body.user_id);
  console.log(isExist);
  if (isExist) return res.status(400).send({ msg: "you are already applied" });

  try {
    const apply1 = await Job.findByIdAndUpdate(
      req.params.id,
      { $push: { condidats: req.body.user_id } },
      { useFindAndModify: false }
    );
    console.log(apply.condidats);

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "mail.DREAMJOB.com",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "your_mail@gmail.com", // generated ethereal user
    //     pass: "your_password", // generated ethereal password
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
    const auth = {
      auth: {
        api_key: process.env.API_KEY, // TODO:
        domain: process.env.DOMAIN, // TODO:
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    let transporter = nodemailer.createTransport(mailGun(auth));

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Dream Job" <rhdreamjob@dream.com>', // sender address
      to: apply.email, // list of receivers
      subject: "Job Application", // Subject line
      text: "Hello", // plain text body
      html: output, // html body
      attachments: [
        {
          path: path,
        },
      ],
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      fs.unlink(path, (err) => {
        if (err) {
          return res.end(err);
        } else {
          console.log("deleted");
          
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = apply;

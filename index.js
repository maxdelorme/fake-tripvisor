require("dotenv").config();
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.json("C'est good");
});

app.post("/form", async (req, res) => {
  try {
    const { firstname, lastname, email, content } = req.body;

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILSENDER_TOKEN,
    });

    const sentFrom = new Sender(
      `info@${process.env.MAILSENDER_DOMAIN}`,
      "Maxime D"
    );

    const recipients = [new Recipient(email, firstname + " " + lastname)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml(content)
      .setText(content);

    console.log("sending email");
    console.log(req.body);

    await mailerSend.email.send(emailParams);

    res.json({ message: "formulaire traité" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "Page not found on Vinted Server" });
});

app.listen(process.env.PORT, () => {
  console.log("Trip started 🚀");
});

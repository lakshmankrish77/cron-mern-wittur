
// import SENDMAIL from "./mail-service.js";
// import HTML_TEMPLATE from "./mail-template.js";
import SENDMAIL from "./MailService/mail-service.js";
import HTML_TEMPLATE from "./MailService/mail-template.js";


    const message = "Hi there, you were emailed me through nodemailer"
    const options = {
        from: "witturtest596@gmail.com", // sender address
        to: "brainhuttechnologies@gmail.com", // receiver email
        subject: "Send email in Node.JS with Nodemailer using Gmail account001", // Subject line
        text: message,
        html: HTML_TEMPLATE(message),
    }

    SENDMAIL(options, (info) => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
    });

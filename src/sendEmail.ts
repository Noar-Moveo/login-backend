import nodemailer from "nodemailer";

const sendEmail = async (
  email: string,
  subject: string,
  text: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "noa2308r@gmail.com",
        pass: "yiuf yvsk wlht urfs", // Replace with your generated app password
      },
    });

    await transporter.sendMail({
      from: "noa2308r@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error:", error);
    console.log("Email not sent");
  }
};

export default sendEmail;

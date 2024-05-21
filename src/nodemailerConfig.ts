// import nodemailer from "nodemailer";
// import { google } from "googleapis";

// const OAuth2 = google.auth.OAuth2;

// const createTransporter = async () => {
//   const oauth2Client = new OAuth2(
//     "YOUR_CLIENT_ID", // Replace with your Client ID
//     "YOUR_CLIENT_SECRET", // Replace with your Client Secret
//     "https://developers.google.com/oauthplayground" // Redirect URL
//   );

//   oauth2Client.setCredentials({
//     refresh_token:
//       "1//04IWMgKKox-rvCgYIARAAGAQSNwF-L9IrWBS6F_oI7DhLQmwE2noP4CIGDJIAGfFqInQo7wronyeWipbnlU2zvOA6Nf3Mxb_XbTM", // Replace with your refresh token
//   });

//   const accessToken = await oauth2Client.getAccessToken();

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "your-email@gmail.com", // your Gmail address
//       clientId: "YOUR_CLIENT_ID",
//       clientSecret: "YOUR_CLIENT_SECRET",
//       refreshToken: "YOUR_REFRESH_TOKEN",
//       accessToken: accessToken.token,
//     },
//   });

//   return transporter;
// };

// export const sendEmail = async (emailOptions: any) => {
//   const emailTransporter = await createTransporter();
//   await emailTransporter.sendMail(emailOptions);
// };

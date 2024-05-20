import twilio from "twilio";
import winston from "winston";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const messagingServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

let otpStorage: { [key: string]: string } = {};

export const sendOtp = async (phoneNumber: string) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(phoneNumber);
  winston.info(`Generated OTP: ${otp} for phone number: ${phoneNumber}`);

  await client.messages.create({
    body: `Your OTP code is: ${otp}`,
    messagingServiceSid: messagingServiceSid,
    to: phoneNumber,
  });
  otpStorage[phoneNumber] = otp;
  return otp;
};
export const verifyOtp = (phoneNumber: string, receivedOtp: string) => {
  const sentOtp = otpStorage[phoneNumber];
  if (sentOtp === receivedOtp) {
    delete otpStorage[phoneNumber];
    return true;
  }
  return false;
};

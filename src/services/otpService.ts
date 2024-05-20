import twilio from "twilio";
import winston from 'winston';

const accountSid =
  process.env.TWILIO_ACCOUNT_SID || "ACbf8f3201f057571cdcc6e7f07dd5b937";
const authToken =
  process.env.TWILIO_AUTH_TOKEN || "9a04a4cab8ec35e71003a78727a6789c";
const client = twilio(accountSid, authToken);
const messagingServiceSid = "MGb403fd71f133783d93f75c7f1599ab67";

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

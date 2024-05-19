import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (!accountSid || !authToken || !verifyServiceSid) {
  throw new Error("Twilio environment variables are not set");
}

const client = twilio(accountSid, authToken);

export const sendOtp = async (
  to: string,
  channel: string = "sms",
  locale: string = "en"
) => {
  return client.verify.services(verifyServiceSid).verifications.create({
    to,
    channel,
    locale,
  });
};

export const verifyOtp = async (to: string, code: string) => {
  return client.verify.services(verifyServiceSid).verificationChecks.create({
    to,
    code,
  });
};

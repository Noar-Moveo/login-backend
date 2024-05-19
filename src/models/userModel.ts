import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

declare module "joi" {
  interface Root {
    objectId(): any;
  }
}

Joi.objectId = JoiObjectId(Joi);

interface UserType {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  password: string;
  bank: string;
  branch: string;
  accountNumber: string;
  creditCardName: string;
  creditCardNumber: string;
  expirationDate: string;
  cvv: string;
  agreedToTerms: boolean;
  businessID: string;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true },
  bank: { type: String },
  branch: { type: String },
  accountNumber: { type: String },
  creditCardName: { type: String },
  creditCardNumber: { type: String },
  expirationDate: { type: String },
  cvv: { type: String },
  agreedToTerms: { type: Boolean, default: false },
  businessID: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

function validateUser(user: UserType) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    companyName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(8).max(15).required(),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().min(6).required(),
    bank: Joi.string().allow(""),
    branch: Joi.string().allow(""),
    accountNumber: Joi.string().allow(""),
    creditCardName: Joi.string().allow(""),
    creditCardNumber: Joi.string().allow(""),
    expirationDate: Joi.string().allow(""),
    cvv: Joi.string().allow(""),
    agreedToTerms: Joi.boolean().default(false),
    businessID: Joi.string().min(1).max(50).required(),
  });

  return schema.validate(user);
}

export { User, validateUser };

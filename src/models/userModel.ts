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
    firstName: Joi.string().regex(/^[a-zA-Z]{1,50}$/).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]{1,50}$/).required(),
    companyName: Joi.string().regex(/^[a-zA-Z0-9]{1,50}$/).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .regex(/^(50|52|53|54|55|57|58)\d{7}$/)
      .required(),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().min(6).required(),
    bank: Joi.string().allow(""),
    branch: Joi.string().regex(/^\d{3}$/).allow(""),
    accountNumber: Joi.string().regex(/^\d{1,9}$/).allow(""),
    creditCardName: Joi.string().regex(/^[a-zA-Z]{1,50}$/).allow(""),
    creditCardNumber: Joi.string().regex(/^\d{16}$/).allow(""),
    expirationDate: Joi.string().allow(""),
    cvv: Joi.string().regex(/^\d{3}$/).allow(""),
    agreedToTerms: Joi.boolean().default(false),
    businessID: Joi.string().regex(/^\d{8,9}$/).required(),
  });

  return schema.validate(user);
}

export { User, validateUser };

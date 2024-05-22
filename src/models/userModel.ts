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
  firstName: {
    type: String,
    required: true,
    match: /^[\u0590-\u05FFa-zA-Z]{1,50}$/,
  },
  lastName: {
    type: String,
    required: true,
    match: /^[\u0590-\u05FFa-zA-Z]{1,50}$/,
  },
  companyName: {
    type: String,
    required: true,
    match: /^[\u0590-\u05FFa-zA-Z0-9]{1,50}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^(50|52|53|54|55|57|58)\d{7}$/,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 12,
  },
  bank: {
    type: String,
  },
  branch: {
    type: String,
    match: /^\d{3}$/,
  },
  accountNumber: {
    type: String,
    match: /^\d{1,9}$/,
  },
  creditCardName: {
    type: String,
    match: /^[\u0590-\u05FFa-zA-Z]{1,50}$/,
  },
  creditCardNumber: {
    type: String,
    match: /^\d{16}$/,
  },
  expirationDate: {
    type: String,
  },
  cvv: {
    type: String,
    match: /^\d{3}$/,
  },
  agreedToTerms: {
    type: Boolean,
    default: false,
  },
  businessID: {
    type: String,
    required: true,
    match: /^\d{8,9}$/,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user: UserType) {
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[\u0590-\u05FFa-zA-Z]{1,50}$/)
      .required(),
    lastName: Joi.string()
      .regex(/^[\u0590-\u05FFa-zA-Z]{1,50}$/)
      .required(),
    companyName: Joi.string()
      .regex(/^[\u0590-\u05FFa-zA-Z0-9]{1,50}$/)
      .required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .regex(/^(50|52|53|54|55|57|58)\d{7}$/)
      .required(),
    dateOfBirth: Joi.date().required(),
    password: Joi.string().min(12).required(),
    bank: Joi.string().allow(""),
    branch: Joi.string()
      .regex(/^\d{3}$/)
      .allow(""),
    accountNumber: Joi.string()
      .regex(/^\d{1,9}$/)
      .allow(""),
    creditCardName: Joi.string()
      .regex(/^[\u0590-\u05FFa-zA-Z]{1,50}$/)
      .allow(""),
    creditCardNumber: Joi.string()
      .regex(/^\d{16}$/)
      .allow(""),
    expirationDate: Joi.string().allow(""),
    cvv: Joi.string()
      .regex(/^\d{3}$/)
      .allow(""),
    agreedToTerms: Joi.boolean().default(false),
    businessID: Joi.string()
      .regex(/^\d{8,9}$/)
      .required(),
  });

  return schema.validate(user);
}

export { User, validateUser };

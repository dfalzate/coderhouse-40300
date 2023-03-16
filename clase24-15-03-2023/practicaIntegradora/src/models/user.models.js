import { Schema, model } from "mongoose";

const roles = ["admin", "superadmin", "user"];

const schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: roles,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("Users", schema);

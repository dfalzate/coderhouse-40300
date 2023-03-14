import { Schema, model } from "mongoose";

const schema = new Schema({}, {});

export const UserModel = model("Users", schema);

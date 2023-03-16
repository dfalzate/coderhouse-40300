import { UserModel } from "../models/user.models.js";
import bcrypt from "bcrypt";

export async function createUser(data) {
  try {
    const user = await this.getUser(data.email);
    if (user) {
      throw new Error("El email ya existe");
    } else {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
      const user = await UserModel.create(data);
      return user;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(email) {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(email, data) {
  try {
    throw new Error('No implementado')
  } catch (error) {
    throw new Error(error.message);
  }
}

import {getUser} from '../services/user.service.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config/config.js'

export async function login(email, password) {
  try {
    const user = await getUser(email)
    if (!user) { throw new Error('El usuario no existe') } else {
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        throw new Error('Usuario o password incorrecto')
      } else {
        delete user._doc.password
        const token = jwt.sign({ user }, config.secret, { expiresIn: '10h' })
        return token
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

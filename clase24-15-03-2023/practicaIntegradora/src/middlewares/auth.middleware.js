import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export function authentication(req, res, next) {
  try {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        return res.status(403).send('Falta el header de autenticación')
    } else {
      const token = authHeader.split(' ')[1]
      const user = jwt.verify(token, config.secret)
      if (!user) {
        throw new Error('Error de autenticación')
      } else {
        req.user = user.user
        return next()
      }
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export function authorization(roles) {
  return (req, res, next) => {
    const userRole = req.user.role
    if (!roles.includes(userRole)) return res.status(403).send('Error de autorización')
    return next()
  }
}
import * as AuthService from '../services/auth.service.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const response = await AuthService.login(email, password)
    res.json({token:response})
  } catch (error) {
    res.status(400).send(error.message)
  }
}
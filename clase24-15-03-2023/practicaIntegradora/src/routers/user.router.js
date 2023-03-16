import { Router } from 'express'
import * as UserController from '../controllers/user.controller.js'

const router = Router()

router.post("/",UserController.createUser)
router.get("/:email",UserController.getUser)
router.put("/:email",UserController.updateUser)

export default router
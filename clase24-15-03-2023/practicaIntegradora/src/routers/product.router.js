import { Router } from 'express'
import productController from '../controllers/product.controller.js'
import { authentication,authorization } from '../middlewares/auth.middleware.js'

class ProductRouter{
  constructor() {
    this.Router = Router()
    this.Router.post("/",authentication,authorization(['admin']),productController.create)
    this.Router.get("/",authentication,authorization,productController.getMany)
    this.Router.get("/:id",authentication,authorization(['superadmin','admin']),productController.getOne)
    this.Router.put("/:id",authentication,productController.update)
    this.Router.delete("/:id",authentication,productController.delete)
  }

  getRouter() {
    return this.Router
  }

}

export default new ProductRouter()